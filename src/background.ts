import hdr from "hdr-histogram-js";

// NOTE: get current navigator connection
const networkInfo = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

const networkDownlinkHist = hdr.build({
		bitBucketSize: 'packed',
		autoResize: true,
		lowestDiscernibleValue: 1,
		highestTrackableValue: 2,
		// let's use WASM by default
		useWebAssembly: true,
})

// https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
//
// downlink: (double)
// The downlink read-only property of the NetworkInformation interface returns
// the effective bandwidth estimate in megabits per second, rounded to the nearest
// multiple of 25 kilobits per seconds.
//
// downlinkMax: (double)
// Returns the maximum downlink speed, in megabits per second (Mbps), for the
// underlying connection technology.
//
// rtt: (double)
// Returns the estimated effective round-trip time of the current connection,
// rounded to the nearest multiple of 25 milliseconds.
//
// type: (string)
// bluetooth, cellular, ethernet, none, wifi, wimax, other, unknown
//
// effectiveType: (string)
// Returns the effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'.
//
//
networkInfo.addEventListener("change", () => {
		const downlink = networkInfo.downlink;

		// record current downlink
		networkDownlinkHist.recordValue(downlink);
})


const webRequest = chrome.webRequest;

// webRequest.addEventListener("beforeSendHeaders"
