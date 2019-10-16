import { TEMP } from '.'

const temp = id => ({
	type: TEMP.LOAD,
	id,
})

const setTemp = (id, downloads) => ({
	type: TEMP.LOAD_SUCCESS,
	id,
	downloads,
})

const setTempError = id => ({
	type: TEMP.LOAD_FAIL,
	id,
})

export { temp, setTemp, setTempError }
