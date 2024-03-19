import homepage from './homepage.png';
import signin from './signin.png';
import playlistadder from './playlistadder.png';
import playlistdifferstage from './playlistdifferstage.png';
import playlistdiffercustom from './playlistdiffercustom.png';
import playlistdifferreview from './playlistdifferreview.png';
import playlistdifferpending from './playlistdifferpending.png';
import playlistdifferpost from './playlistdifferpost.png';

const homepageObj = {
	image: homepage,
	desc: 'MixDelta home page'
};;

const signinObj = {
	image: signin,
	desc: 'MixDelta sign in page'
};

const playlistadderObj = {
	image: playlistadder,
	desc: 'The playlist adding dialogue'
};

const playlistdifferstagerObj = {
	image: playlistdifferstage,
	desc: 'A stage in the playlist diffing flow'
};

const playlistdiffercustomObj = {
	image: playlistdiffercustom,
	desc: 'Customizing the details of the new playlist'
};

const playlistdifferreviewObj = {
	image: playlistdifferreview,
	desc: 'Reviewing what the new playlist will contain'
};

const playlistdifferpendingObj = {
	image: playlistdifferpending,
	desc: 'Waiting for the diff operation to copmlete'
};

const playlistdifferpostObj = {
	image: playlistdifferpost,
	desc: 'Reviewing the results of the diff operation'
};

export {
	homepageObj,
	signinObj,
	playlistadderObj,
	playlistdifferstagerObj,
	playlistdiffercustomObj,
	playlistdifferreviewObj,
	playlistdifferpendingObj,
	playlistdifferpostObj,
};
