const input1 = [
'Downloads',
'Videos',
'capture',
'mp4',
];

/**
 * Calculate path with the extension of the file add to last element.
 * This implementation uses non-mutating methods (slices) for a functional approach.
 * @param {Array<string>} inputArray
 * @returns Path string
 */
const pathFunctional = (inputArray) => {
    const pathArray = inputArray.slice(0, -1); 
    const extensionArray = inputArray.slice(-1); 
    return pathArray.join('/') + '.' + extensionArray[0];
}; 

const finalOutput1 = pathFunctional(input1); //Output => 'Downloads/Videos/capture.mp4'
console.log(finalOutput1); 


const input2 = [
'CodinGame',
'python',
'py',
];

const finalOutput2 = pathFunctional(input2); // Output => 'CodinGame/python.py'
console.log(finalOutput2);

const input3 = [
'programming',
'languages',
'easy',
'beginner',
'useful',
'pythonstuff',
'py',
];

const finalOutput3 = pathFunctional(input3); // Output => 'programming/languages/easy/beginner/useful/pythonstuff.py'
console.log(finalOutput3)
