/********************** 
 * Blockedstroop Test *
 **********************/

// init psychoJS:
var psychoJS = new PsychoJS({
  debug: true
});
var my = psychoJS;

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new Color('black'),
  units: 'height'
});

// store info about the experiment session:
my.expName = 'blockedStroop';  // from the Builder filename that created this script
my.expInfo = {'participant': '', 'session': '001', 'group': 'A'};


// set up the experiment:
psychoJS.schedule(setupExperiment);

// register all available resources and download them:
psychoJS.scheduleResources();

// dialog box:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: my.expInfo,
  title: my.expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(() => (psychoJS.gui.dialogComponent.button === 'OK'), flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
const blocksLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(blocksLoopBegin, blocksLoopScheduler);
flowScheduler.add(blocksLoopScheduler);
flowScheduler.add(blocksLoopEnd);
flowScheduler.add(ThanksRoutineBegin);
flowScheduler.add(ThanksRoutineEachFrame);
flowScheduler.add(ThanksRoutineEnd);
flowScheduler.add(quitPsychoJS);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS);

psychoJS.start();


function setupExperiment() {
  if (psychoJS.status === PsychoJS.Status.NOT_CONFIGURED) {
    psychoJS.status = PsychoJS.Status.CONFIGURING;

    psychoJS.configure('config.json')
    .then( config => {

      // An ExperimentHandler isn't essential but helps with data saving
      psychoJS.experiment = new ExperimentHandler({extraInfo: my.expInfo});

      /*
      // logging:
      my.logger.console.setLevel(psychoJS.logging.WARNING);
      my.logger.server.set({'level':psychoJS.logging.WARNING, 'saveTo':'EXPERIMENT_SERVER', 'experimentInfo': my.expInfo});*/

      // change status to leave setupExperiment loop:
      psychoJS.status = PsychoJS.Status.CONFIGURED;
    });
  }

  // the loop will return until the configuration is completed
  // at which point the status changes to CONFIGURED
  if (psychoJS.status === PsychoJS.Status.CONFIGURED) {
    psychoJS.status = PsychoJS.Status.STARTED;
    return Scheduler.Event.NEXT;
  } else
    return Scheduler.Event.FLIP_REPEAT;
}

function updateInfo() {
  my.expInfo['date'] = MonotonicClock.getDateStr();  // add a simple timestamp
  my.expInfo['expName'] = my.expName;

  // store frame rate of monitor if we can measure it successfully
  my.expInfo['frameRate'] = my.window.getActualFrameRate();
  if (typeof my.expInfo['frameRate'] !== 'undefined')
    my.frameDur = 1.0/Math.round(my.expInfo['frameRate']);
  else
    my.frameDur = 1.0/60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  addInfoFromUrl(my.expInfo);

  return Scheduler.Event.NEXT;
}

function experimentInit() {
  // Initialize components for Routine "instructions"
  my.instructionsClock = new Clock();
  my.instrText = new TextStim({
    win : my.window,
    name : 'my.instrText',
    text : 'default text',
    font : 'Arial',
    units : 'height',   pos : [0, 0], height : 0.05,  wrapWidth : undefined, ori: 0,
    color : new Color('white'),  opacity : 1,
    depth : 0.0 
  });
  
  // Initialize components for Routine "trial"
  my.trialClock = new Clock();
  my.stim = new TextStim({
    win : my.window,
    name : 'my.stim',
    text : 'default text',
    font : 'Arial',
    units : 'height',   pos : [0, 0], height : 0.15,  wrapWidth : undefined, ori: 0,
    color : new Color('white'),  opacity : 1,
    depth : 0.0 
  });
  
  // Initialize components for Routine "Thanks"
  my.ThanksClock = new Clock();
  my.thanksText = new TextStim({
    win : my.window,
    name : 'my.thanksText',
    text : 'Thank you for taking part.',
    font : 'Arial',
    units : 'height',   pos : [0, 0], height : 0.05,  wrapWidth : undefined, ori: 0,
    color : new Color('white'),  opacity : 1,
    depth : 0.0 
  });
  
  // Create some handy timers
  my.globalClock = new Clock();  // to track the time since experiment started
  my.routineTimer = new CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}

function blocksLoopBegin(thisScheduler) {
  // set up handler to look after randomisation of conditions etc
  my.blocks = new TrialHandler({
    psychoJS,
    nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
    extraInfo: my.expInfo, originPath: undefined,
    trialList: (('group' + my.expInfo['group']) + '.xlsx'),
    seed: undefined, name: 'my.blocks'});
  psychoJS.experiment.addLoop(my.blocks); // add the loop to the experiment

  // Schedule all the trials in the trialList:
  for (const thisBlock of my.blocks) {
    thisScheduler.add(importTrialAttributes(thisBlock));
    thisScheduler.add(instructionsRoutineBegin);
    thisScheduler.add(instructionsRoutineEachFrame);
    thisScheduler.add(instructionsRoutineEnd);
    const trialsLoopScheduler = new Scheduler(psychoJS);
    thisScheduler.add(trialsLoopBegin, trialsLoopScheduler);
    thisScheduler.add(trialsLoopScheduler);
    thisScheduler.add(trialsLoopEnd);
    thisScheduler.add(endLoopIteration(thisBlock));
  }

  return Scheduler.Event.NEXT;
}

function trialsLoopBegin(thisScheduler) {
  // set up handler to look after randomisation of conditions etc
  my.trials = new TrialHandler({
    psychoJS,
    nReps: 1, method: TrialHandler.Method.RANDOM,
    extraInfo: my.expInfo, originPath: undefined,
    trialList: (my.language + '.xlsx'),
    seed: undefined, name: 'my.trials'});
  psychoJS.experiment.addLoop(my.trials); // add the loop to the experiment

  // Schedule all the trials in the trialList:
  for (const thisTrial of my.trials) {
    thisScheduler.add(importTrialAttributes(thisTrial));
    thisScheduler.add(trialRoutineBegin);
    thisScheduler.add(trialRoutineEachFrame);
    thisScheduler.add(trialRoutineEnd);
    thisScheduler.add(endLoopIteration(thisTrial));
  }

  return Scheduler.Event.NEXT;
}

function trialsLoopEnd() {
  psychoJS.experiment.removeLoop(my.trials);
  psychoJS.experiment.save({
    attributes: my.trials.getAttributes()
  });

  return Scheduler.Event.NEXT;
}

function blocksLoopEnd() {
  psychoJS.experiment.removeLoop(my.blocks);
  psychoJS.experiment.save({
    attributes: my.blocks.getAttributes()
  });

  return Scheduler.Event.NEXT;
}

function instructionsRoutineBegin() {
  //------Prepare to start Routine 'instructions'-------
  my.t = 0;
  my.instructionsClock.reset(); // clock
  my.frameN = -1;
  // update component parameters for each repeat
  my.instrText.setText(my.Instructions);
  my.finish = new BuilderKeyResponse(psychoJS);
  // keep track of which components have finished
  my.instructionsComponents = [];
  my.instructionsComponents.push(my.instrText);
  my.instructionsComponents.push(my.finish);
  
  for (const thisComponent of my.instructionsComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}

function instructionsRoutineEachFrame() {
  //------Loop for each frame of Routine 'instructions'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  my.t = my.instructionsClock.getTime();
  my.frameN = my.frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *my.instrText* updates
  if (my.t >= 0.0 && my.instrText.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    my.instrText.tStart = my.t;  // (not accounting for frame time here)
    my.instrText.frameNStart = my.frameN;  // exact frame index
    my.instrText.setAutoDraw(true);
  }
  
  // *my.finish* updates
  if (my.t >= 0.0 && my.finish.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    my.finish.tStart = my.t;  // (not accounting for frame time here)
    my.finish.frameNStart = my.frameN;  // exact frame index
    my.finish.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    my.finish.clock.reset();  // now t=0
    my.eventManager.clearEvents({eventType:'keyboard'});
  }
  if (my.finish.status === PsychoJS.Status.STARTED) {
    let theseKeys = my.eventManager.getKeys();
    
    // check for quit:
    if ("escape" in theseKeys) {
        psychoJS.experiment.experimentEnded = true;
    }
    if (theseKeys.length > 0) {  // at least one key was pressed
      my.finish.keys = theseKeys[theseKeys.length-1]  // just the last key pressed
      my.finish.rt = my.finish.clock.getTime();
      // a response ends the routine
      continueRoutine = false;
    }
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  continueRoutine = false;// reverts to True if at least one component still running
  for (const thisComponent of my.instructionsComponents)
    if ('status' in thisComponent && thisComponent.status != PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  // check for quit (the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    psychoJS.quit('The [Escape] key was pressed. Goodbye!');
  }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}

function instructionsRoutineEnd() {
  //------Ending Routine 'instructions'-------
  for (const thisComponent of my.instructionsComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  // check responses
  if (['', [], undefined].indexOf(my.finish.keys) >= 0) {    // No response was made
      my.finish.keys = undefined;
  }
  my.experiment.addData('my.finish.keys', my.finish.keys);
  if (my.finish.keys != undefined) {  // we had a response
      my.experiment.addData('my.finish.rt', my.finish.rt);
  }
  // the Routine "instructions" was not non-slip safe, so reset the non-slip timer
  my.routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

function trialRoutineBegin() {
  //------Prepare to start Routine 'trial'-------
  my.t = 0;
  my.trialClock.reset(); // clock
  my.frameN = -1;
  // update component parameters for each repeat
  my.stim.setColor(new Color(my.wordColor));
  my.stim.setText(my.word);
  my.resp = new BuilderKeyResponse(psychoJS);
  // keep track of which components have finished
  my.trialComponents = [];
  my.trialComponents.push(my.stim);
  my.trialComponents.push(my.resp);
  
  for (const thisComponent of my.trialComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}

function trialRoutineEachFrame() {
  //------Loop for each frame of Routine 'trial'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  my.t = my.trialClock.getTime();
  my.frameN = my.frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *my.stim* updates
  if (my.t >= 0.5 && my.stim.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    my.stim.tStart = my.t;  // (not accounting for frame time here)
    my.stim.frameNStart = my.frameN;  // exact frame index
    my.stim.setAutoDraw(true);
  }
  
  // *my.resp* updates
  if (my.t >= 0.5 && my.resp.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    my.resp.tStart = my.t;  // (not accounting for frame time here)
    my.resp.frameNStart = my.frameN;  // exact frame index
    my.resp.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    my.resp.clock.reset();  // now t=0
    my.eventManager.clearEvents({eventType:'keyboard'});
  }
  if (my.resp.status === PsychoJS.Status.STARTED) {
    let theseKeys = my.eventManager.getKeys({keyList:['left', 'down', 'right']});
    
    // check for quit:
    if ("escape" in theseKeys) {
        psychoJS.experiment.experimentEnded = true;
    }
    if (theseKeys.length > 0) {  // at least one key was pressed
      my.resp.keys = theseKeys[theseKeys.length-1]  // just the last key pressed
      my.resp.rt = my.resp.clock.getTime();
      // was this 'correct'?
      if (my.resp.keys == my.corrAns) {
          my.resp.corr = 1;
      } else {
          my.resp.corr = 0;
      }
      // a response ends the routine
      continueRoutine = false;
    }
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  continueRoutine = false;// reverts to True if at least one component still running
  for (const thisComponent of my.trialComponents)
    if ('status' in thisComponent && thisComponent.status != PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  // check for quit (the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    psychoJS.quit('The [Escape] key was pressed. Goodbye!');
  }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}

function trialRoutineEnd() {
  //------Ending Routine 'trial'-------
  for (const thisComponent of my.trialComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  // check responses
  if (['', [], undefined].indexOf(my.resp.keys) >= 0) {    // No response was made
      my.resp.keys = undefined;
  }
  // was no response the correct answer?!
  if (my.resp.keys == undefined) {
    if (psychoJS.str(my.corrAns).toLowerCase() == 'none') {
       my.resp.corr = 1  // correct non-response
    } else {
       my.resp.corr = 0  // failed to respond (incorrectly)
    }
  }
  // store data for my.thisExp (ExperimentHandler)
  my.experiment.addData('my.resp.keys', my.resp.keys);
  my.experiment.addData('my.resp.corr', my.resp.corr);
  if (my.resp.keys != undefined) {  // we had a response
      my.experiment.addData('my.resp.rt', my.resp.rt);
  }
  // the Routine "trial" was not non-slip safe, so reset the non-slip timer
  my.routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

function ThanksRoutineBegin() {
  //------Prepare to start Routine 'Thanks'-------
  my.t = 0;
  my.ThanksClock.reset(); // clock
  my.frameN = -1;
  my.routineTimer.add(3.000000);
  // update component parameters for each repeat
  // keep track of which components have finished
  my.ThanksComponents = [];
  my.ThanksComponents.push(my.thanksText);
  
  for (const thisComponent of my.ThanksComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}

function ThanksRoutineEachFrame() {
  //------Loop for each frame of Routine 'Thanks'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  my.t = my.ThanksClock.getTime();
  my.frameN = my.frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *my.thanksText* updates
  if (my.t >= 0.0 && my.thanksText.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    my.thanksText.tStart = my.t;  // (not accounting for frame time here)
    my.thanksText.frameNStart = my.frameN;  // exact frame index
    my.thanksText.setAutoDraw(true);
  }
  my.frameRemains = 0.0 + 3 - my.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (my.thanksText.status === PsychoJS.Status.STARTED && my.t >= my.frameRemains) {
    my.thanksText.setAutoDraw(false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  continueRoutine = false;// reverts to True if at least one component still running
  for (const thisComponent of my.ThanksComponents)
    if ('status' in thisComponent && thisComponent.status != PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  // check for quit (the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    psychoJS.quit('The [Escape] key was pressed. Goodbye!');
  }
  
  // refresh the screen if continuing
  if (continueRoutine && my.routineTimer.getTime() > 0) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}

function ThanksRoutineEnd() {
  //------Ending Routine 'Thanks'-------
  for (const thisComponent of my.ThanksComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  return Scheduler.Event.NEXT;
}

function endLoopIteration(thisTrial) {
  // ------Prepare for next entry------
  return function () {
    if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
      my.experiment.nextEntry();
    }
  return Scheduler.Event.NEXT;
  };
}

function importTrialAttributes(thisTrial) {
  return function () {
    psychoJS.importAttributes(thisTrial);

    return Scheduler.Event.NEXT;
  };
}

function quitPsychoJS() {
  my.window.close();
  psychoJS.quit();

  return Scheduler.Event.QUIT;
}
