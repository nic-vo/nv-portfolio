This is the repo for my personal portfolio

# CHANGELOG

## 1.1.2
	- More W3C errors fixed
	- Issue around mobile nav fixed
	- Performance considerations for mobile

### 1.1.1
	- Fix for some W3C validation errors
	- Adjust font size for hero

### 1.1.0
  - Method restriction for cf
  - Change to dynamic routes / imports for projects

### 1.0.2
  - Modify pattern for project page navigation
  - Fix All Stop button on drumMachine not triggering pause events

### 1.0.1
  - Code refactor for library functions
  - CSS animations adjusted to non-repainting attributes
  - Small layout changes


### 1.0.0
  - Contact Form works
  - General styling overhaul
  - All projects updated
  - Project information propagated getting props through markdown / json files
  - Project layout finalized

### 0.11.0
  - Update to Next 13
  - Calculator
    - Minor style / layout changes
  - Pomodoro
    - Add skip phase functionality
    - Styling

### 0.10.0
  - Pomodoro
    - Initialize
  - Homepage
    - Remove bootstrapped footer
    - Replace with version # static prop

### 0.9.0
  - DrumMachine
    - Lowered some state to pad component and master volume slider component
    - Made more use of document api for keypress and global stops / mutes

### 0.8.0
  - Home
    - Link lists based on scanning pages dir
      - Contains thumbs via next/image
  - DrumMachine
    - More desktop friendly
  - Calculator
    - History layout shift fixed

### 0.7.0
  - Calculator
    - History
      - Refine styling
    - Keypad
      - Memoize (?)
      - Manually normalize vectors for explode
      - Oh yeah, explodes now
    - Parent
      - History state updates correctly (length = 5)
      - Explode simple boolean

### 0.6.0
  - Calculator
    - History
      - Items now disable when a history chunk has been inserted
    - Parent
      - Removes all flow state and uses function that checks chunks where conditionals are needed
      - Allow history chunks to be inserted into eval string only when operators are used
      - Round evaluated strings to the 100 thousandth place
      - Parse double "-" as addition

### 0.5.0
  - Calculator
    - History
      - Accepts array of arrays (1 level of nest)
      - Can insert any value back into active calculation
    - Keypad (component)
      - Accepts handler and value
    - Parent
      - Add most handlers
        - Operator and subtract handlers need work
      - Simple state to control flow

### 0.4.3
  - Drum Machine
    - Parent
      - Reworked global variables for use
    - Control Panel
      - Mobile layout
      - Good glowy effect
    - Pad
      - Fine pad controls now hidden on mobile (who's using them anyway)
      - Good glowy effect

### 0.4.2
  - Drum Machine
    - Parent
      - New Silkscreen font for global use
    - Control Panel
      - Add glowy effect
    - Grid
      - Adjust mobile gaps
    - Pad
      - Add glowy class-based effect upon state change

### 0.4.1
  - Drum Machine
    - Parent
      - Begin mobile styling
      - General button polish
    - Control Panel
      - Begin styling

### 0.4.0
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

### 0.3.0
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

### 0.2.0
  - Drum Machine
    - Keypress triggers for all audio
    - Add display updates on audio play
    - Add live volume adjustment
    - Add controls for muting / looping

### 0.1.0
  - Init. lots of init
