const formAccessible = ({ formFlow, currentStep, step}) => {

    let currentStepIndex = formFlow.indexOf(currentStep);

    let nextStepsArray = formFlow.splice(currentStepIndex, formFlow.length - 1);
    nextStepsArray.shift();

    return !nextStepsArray.includes(step);

}

export default formAccessible;