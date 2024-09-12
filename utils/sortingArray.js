const reArrageArrayOrder = ({ index, type, array }) => {

    let tempSizesArray = [...array];

    switch (type) {
        case 'up': {

            let leftArray = [...tempSizesArray];
            let rightArray = leftArray.splice(index);
            let valueToShift = rightArray.shift();

            if(rightArray[0]){
                leftArray.push(rightArray[0]);
                rightArray[0] = valueToShift;
                tempSizesArray = [...leftArray, ...rightArray];
            }

            break;

        }
        case 'down': {
            
            let leftArray = [...tempSizesArray];
            let rightArray = leftArray.splice(index);
            let valueToShift = rightArray.shift();

            if(leftArray[0]){
                rightArray.unshift(leftArray[leftArray.length-1]);
                leftArray.pop();
                leftArray.push(valueToShift);
                tempSizesArray = [...leftArray, ...rightArray];
            }

            break;

        }
        default:
            break;
    }

    return tempSizesArray;

}

export { reArrageArrayOrder }