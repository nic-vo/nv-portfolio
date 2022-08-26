This is the repo for my personal portfolio

# CHANGELOG

# 0.6.0
  - Calculator
    - History
      - Items now disable when a history chunk has been inserted
    - Parent
      - Removes all flow state and uses function that checks chunks where conditionals are needed
      - Allow history chunks to be inserted into eval string only when operators are used
      - Round evaluated strings to the 100 thousandth place
      - Parse double "-" as addition


## 0.5.0
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

## 0.4.3
  - Drum Machine
    - Parent
      - Reworked global variables for use
    - Control Panel
      - Mobile layout
      - Good glowy effect
    - Pad
      - Fine pad controls now hidden on mobile (who's using them anyway)
      - Good glowy effect

## 0.4.2
  - Drum Machine
    - Parent
      - New Silkscreen font for global use
    - Control Panel
      - Add glowy effect
    - Grid
      - Adjust mobile gaps
    - Pad
      - Add glowy class-based effect upon state change

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
