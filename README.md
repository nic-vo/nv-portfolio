This is the repo for my personal portfolio

# CHANGELOG

## 0.4.1
	- Drum Machine
		- Parent
			- Begin mobile styling
			- General button polish
		- Control Panel
			- Begin styling

## 0.4.0
	- Drum Machine
		- Parent
			- Remove unnecessary state for bank
			- Move globalish CSS styles to the global DrumMachine module
		- Control Panel
			- Style buttons based on mVolume prop
			- Remove unnecessary bank prop in favor of index
		- Control panel
			- Remove unnecessary bank prop in favor of index
			- Style buttons based on mVolume, muteAll props
			- Style buttons based on local muted and loop state

## 0.3.0
	- Drum Machine
		- Parent
			- Global mute added
			- Global sound pause added
			- Switching sound banks now switches sound src for each pad
		- Pad
			- Now interacts properly with global mute
			- Switching sound banks calls HTML5 audio DOM stuff
			- Receives pulse events in form of stopAll prop and activate prop
			- Loop bugfix

## 0.2.0
	- Drum Machine
		- Keypress triggers for all audio
		- Add display updates on audio play
		- Add live volume adjustment
		- Add controls for muting / looping

## 0.1.0
	- Init. lots of init
