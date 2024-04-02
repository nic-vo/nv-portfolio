# Welcome to the repo for Nicolas Vo's portfolio website!

This is a Next.js App router endeavor!

## CHANGELOG

### 2.2.0

- Update Hero with parallax effect
- Fix mobile widths
- Make Header read colocated .json files
- Add new info to Nav links

### 2.1.2

- Make prop getters root dir agnostic

### 2.1.1

- Refactor contact form route

### 2.1.0

- Colocate props for projects
- Expand metadata for pages
  - Nest and override where appropriate
- Adjust default pages

### 2.0.0

- Convert to Next 14 App router
- Convert layout related styling to tailwind
- Improve accessibility
  - Focusing behavior
  - Off-screen focusing
- Improve aesthetics
  - Homepage hero

### 1.6.0

- Add MixDelta
- Move Markdown and AimTrainer
- Fix z-fighting for Project ScrollToTop and ImageCarousel buttons
- Darken global background
- Return to next/link but with prefetch=false

### 1.5.3

- Fix content size issue for carousel images

### 1.5.2

- Attempt to fix image carousel LCP

### 1.5.1

- Contact Form
  - Type checking

### 1.5.0

- Homepage
  - Attempt to fix LCP issues with thumbnails
  - And \_document HTML fix
- Footer
  - Add obscured text for accessibility purposes
- ImageCarousel
  - Attempt to address LCP issues with next/image
- Fonts
  - Add font-display to gracefully swap fonts

### 1.4.0

- Really clean up homepage styling and DOM
  - Nav no longer has weird borders / hover+focus behavior
  - AboutMe should present correctly on mobile
- Update deps

### 1.3.3

- Clean up homepage styling and DOM
- Adjust layout of project page nav for accessibility

### 1.3.2

- Fix homepage thumbnails

### 1.3.1

- Add Lofi Cafe
- Replace Aim Trainer with Lofi Cafe

### 1.3.0

- Bandwidth consumption fixes
- Fix some issues related to null checks in various components
- Fix excessive renders related to monolithic state in some components

### 1.2.0

- Transition to TypeScript
  - Minimal functionality change across all projects, just type safety and null checks and the like
- Streamline project dynamic imports / encapsulation

### 1.1.3

- Replace depcrated scroll parameter
- Add easier return to home button
- Begin addressing some accessibility issues with project navigation

### 1.1.2

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
