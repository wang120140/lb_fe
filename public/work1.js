
importScripts(`${location.origin}/otbit/turf.min.js`)
// 接收来自主线程的消息并处理
onmessage = function(e) {
  const {
    type,
    value
  } = e.data
  if (type === 'decoratePath') {
    const {
      path,
      segmentLength,
      units
    } = value
    const pathResult = decoratePath(path, segmentLength, units)
    postMessage({
      type,
      value: pathResult
    });
  }
};

function decoratePath(path = [], segmentLength, units) {
	if (!Array.isArray(path)) return []
	// 我们先对传进来的路径数组进行去重处理，然后再对整个去重后的linestring进行间隔分段处理
	let dupPath = removeOutlier(arrayDup(path))
	let line = turf.lineString(dupPath)
  let chunk = []; // 结果数组
  // 获取线段L的长度
  let lineLength = turf.length(line, {units: units});
  if (lineLength <= segmentLength) return;
  // 将要裁成小线段的数目
  let numberOfSegments = lineLength / segmentLength;
  if (!Number.isInteger(numberOfSegments)) {
      numberOfSegments = Math.ceil(numberOfSegments);
  }
  // 循环获取小线段
  for (let i = 0; i < numberOfSegments; i++) {
    let outline = turf.lineSliceAlong(line, segmentLength * i, segmentLength * (i + 1), {units: units});
    chunk.push(outline);
  }
	let flatArr = arrayDup(
    chunk
    .filter(item => item.type === 'Feature')
    .map(item => item.geometry.coordinates)
    .flat()
	)
	return flatArr
}

/**
 * 二维数组去重
 * @param {*} arr
 */
function arrayDup(arr) {
	let res = new Map()
	arr.forEach(item => {
		res.set(JSON.stringify(item), item)
	})
	return Array.from(res.values())
}

/**
 * @description 去除array中前后项对比差值超过difference
 * @param { array } array
 * @param { number } difference 1
 * @return {array}
 */
function removeOutlier(array = [], difference = 1) {
	if (!Array.isArray(array) || array.length < 1) return []
	const differenceMore = (array, i) =>
		(Math.abs(array[i + 1][0] - array[i][0]) >= difference && Math.abs(array[i + 1][0] - array[i + 2][0]) >= difference) ||
		(Math.abs(array[i + 1][1] - array[i][1]) >= difference && Math.abs(array[i + 1][1] - array[i + 2][1]) >= difference)
	try {
		const newArray = array.reduce((pre, item, i, array) => {
			if (array.length < 3) return [...pre, item]
			return i < array.length - 2 && differenceMore(array, i) ? pre : array[i + 1] ? [...pre, array[i + 1]] : pre
		}, [])
		return newArray
	} catch (error) {
		return array
	}
}
