// Global variables
let array = [];
let arraySize = 50;
let animationSpeed = 50;
let isAnimating = false;
let isPaused = false;
let shouldStop = false;
let comparisons = 0;
let swaps = 0;

// Algorithm complexities
const timeComplexities = {
    bubble: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    selection: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    insertion: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    merge: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    quick: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    linear: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    binary: { best: "O(1)", average: "O(log n)", worst: "O(log n)" }
};

// Algorithm information
const algorithmInfo = {
    bubble: {
        name: "Bubble Sort",
        description: "A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        bestCase: "O(n)",
        averageCase: "O(n²)",
        worstCase: "O(n²)",
        spaceComplexity: "O(1)",
        stable: "Yes",
        examples: [
            {
                title: "Best Case",
                description: "Array is already sorted: [1, 2, 3, 4, 5]",
                explanation: "Only one pass needed to confirm sorting"
            },
            {
                title: "Worst Case",
                description: "Array is reverse sorted: [5, 4, 3, 2, 1]",
                explanation: "Maximum number of swaps needed"
            }
        ]
    },
    selection: {
        name: "Selection Sort",
        description: "An in-place sorting algorithm that divides the input list into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region to add to the sorted region.",
        bestCase: "O(n²)",
        averageCase: "O(n²)",
        worstCase: "O(n²)",
        spaceComplexity: "O(1)",
        stable: "No",
        examples: [
            {
                title: "All Cases",
                description: "Performance is the same regardless of input: [64, 25, 12, 22, 11]",
                explanation: "Always performs the same number of comparisons"
            }
        ]
    },
    insertion: {
        name: "Insertion Sort",
        description: "Builds the final sorted array one item at a time by repeatedly inserting a new element into the sorted portion of the array.",
        bestCase: "O(n)",
        averageCase: "O(n²)",
        worstCase: "O(n²)",
        spaceComplexity: "O(1)",
        stable: "Yes",
        examples: [
            {
                title: "Best Case",
                description: "Array is already sorted: [1, 2, 3, 4, 5]",
                explanation: "Each element requires only one comparison"
            },
            {
                title: "Worst Case",
                description: "Array is reverse sorted: [5, 4, 3, 2, 1]",
                explanation: "Each element must be moved to the beginning"
            }
        ]
    },
    merge: {
        name: "Merge Sort",
        description: "A divide-and-conquer algorithm that recursively breaks down the array into smaller subarrays until each subarray contains a single element, then merges them back in sorted order.",
        bestCase: "O(n log n)",
        averageCase: "O(n log n)",
        worstCase: "O(n log n)",
        spaceComplexity: "O(n)",
        stable: "Yes",
        examples: [
            {
                title: "All Cases",
                description: "Performance is consistent: [38, 27, 43, 3, 9, 82, 10]",
                explanation: "Always divides and merges the same way"
            }
        ]
    },
    quick: {
        name: "Quick Sort",
        description: "A divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around it, such that smaller elements are on the left and larger elements are on the right.",
        bestCase: "O(n log n)",
        averageCase: "O(n log n)",
        worstCase: "O(n²)",
        spaceComplexity: "O(log n)",
        stable: "No",
        examples: [
            {
                title: "Best/Average Case",
                description: "Balanced partitions: [7, 2, 1, 6, 8, 5, 3, 4]",
                explanation: "Pivot divides array roughly in half"
            },
            {
                title: "Worst Case",
                description: "Already sorted array: [1, 2, 3, 4, 5]",
                explanation: "Poor pivot choice leads to unbalanced partitions"
            }
        ]
    },
    linear: {
        name: "Linear Search",
        description: "A simple search algorithm that checks each element in sequence until a match is found or the end of the array is reached.",
        bestCase: "O(1)",
        averageCase: "O(n)",
        worstCase: "O(n)",
        spaceComplexity: "O(1)",
        stable: "N/A",
        examples: [
            {
                title: "Best Case",
                description: "Target is first element: [5, 2, 8, 1, 9], search for 5",
                explanation: "Found immediately"
            },
            {
                title: "Worst Case",
                description: "Target is last or not present: [5, 2, 8, 1, 9], search for 9 or 7",
                explanation: "Must check every element"
            }
        ]
    },
    binary: {
        name: "Binary Search",
        description: "An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.",
        bestCase: "O(1)",
        averageCase: "O(log n)",
        worstCase: "O(log n)",
        spaceComplexity: "O(1)",
        stable: "N/A",
        examples: [
            {
                title: "Best Case",
                description: "Target is middle element: [1, 3, 5, 7, 9], search for 5",
                explanation: "Found in first comparison"
            },
            {
                title: "Worst Case",
                description: "Target is at end or not present: [1, 3, 5, 7, 9], search for 9 or 6",
                explanation: "Maximum number of divisions needed"
            }
        ]
    }
};

// Log the algorithm info object to verify it's properly defined
console.log('Algorithm Info Object:', algorithmInfo);

// Create matrix digital rain
function createMatrixRain() {
    const container = document.querySelector('.tech-container');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const numberOfColumns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < numberOfColumns; i++) {
        const drop = document.createElement('div');
        drop.className = 'matrix-rain';
        drop.style.left = `${i * 20}px`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.textContent = characters[Math.floor(Math.random() * characters.length)];
        container.appendChild(drop);

        // Remove and recreate drop after animation
        drop.addEventListener('animationend', () => {
            drop.remove();
            createMatrixDrop(i);
        });
    }
}

function createMatrixDrop(column) {
    const container = document.querySelector('.tech-container');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const drop = document.createElement('div');
    drop.className = 'matrix-rain';
    drop.style.left = `${column * 20}px`;
    drop.style.animationDelay = '0s';
    drop.textContent = characters[Math.floor(Math.random() * characters.length)];
    container.appendChild(drop);

    drop.addEventListener('animationend', () => {
        drop.remove();
        createMatrixDrop(column);
    });
}

// Initialize the visualization
window.onload = () => {
    generateNewArray();
    setupEventListeners();
    createMatrixRain();
    
    // Set initial state of algorithm info
    document.getElementById('algo-description').textContent = 'Select an algorithm to see details';
    document.getElementById('best-case').textContent = '-';
    document.getElementById('average-case').textContent = '-';
    document.getElementById('worst-case').textContent = '-';
    document.getElementById('space-complexity').textContent = '-';
    document.getElementById('stability').textContent = '-';
    document.getElementById('example-cases').innerHTML = '';
    
    // Disable Execute button initially
    document.getElementById('start-btn').disabled = true;
    
    // Store initial state
    saveState();
};

// Setup event listeners
function setupEventListeners() {
    document.getElementById('speed').addEventListener('input', (e) => {
        animationSpeed = e.target.value;
        document.getElementById('speed-value').textContent = e.target.value;
    });

    document.getElementById('array-size').addEventListener('input', (e) => {
        arraySize = parseInt(e.target.value);
        document.getElementById('size-value').textContent = e.target.value;
        generateNewArray();
    });

    // Add immediate algorithm info update on dropdown change
    document.getElementById('algorithm').addEventListener('change', function(e) {
        const selectedAlgorithm = e.target.value;
        console.log('Algorithm changed to:', selectedAlgorithm);
        
        // Enable Execute button when an algorithm is selected
        document.getElementById('start-btn').disabled = false;
        
        const searchInput = document.getElementById('search-value');
        const searchControls = document.querySelector('.search-controls');
        const isSearchAlgorithm = selectedAlgorithm === 'linear' || selectedAlgorithm === 'binary';
        
        // Show/hide search controls
        if (searchControls) {
            searchControls.style.display = isSearchAlgorithm ? 'flex' : 'none';
        }
        
        // Generate appropriate array based on algorithm type
        if (isSearchAlgorithm) {
            if (selectedAlgorithm === 'binary') {
                array = Array.from({length: arraySize}, (_, i) => Math.ceil((i + 1) * (100 / arraySize)));
                document.getElementById('array-size').disabled = true;
            } else {
                generateNewArray();
                document.getElementById('array-size').disabled = false;
            }
            displayBars();
            log(selectedAlgorithm === 'binary' ? 'Generated sorted array for binary search' : 'Generated random array for linear search');
        } else {
            document.getElementById('array-size').disabled = false;
            generateNewArray();
        }
        
        // Force update algorithm information
        updateAlgorithmInfo();
        updateComplexityInfo();
        saveState();
    });
}

// Create circuit line animations
function createCircuitAnimations() {
    const container = document.querySelector('.tech-container');
    const numberOfLines = 10;
    
    for (let i = 0; i < numberOfLines; i++) {
        const line = document.createElement('div');
        line.className = 'circuit-line';
        line.style.top = `${Math.random() * 100}%`;
        line.style.animationDelay = `${Math.random() * 8}s`;
        container.appendChild(line);
        
        // Remove and recreate the line after animation
        line.addEventListener('animationend', () => {
            line.remove();
            createCircuitLine();
        });
    }
}

function createCircuitLine() {
    const container = document.querySelector('.tech-container');
    const line = document.createElement('div');
    line.className = 'circuit-line';
    line.style.top = `${Math.random() * 100}%`;
    line.style.animationDelay = '0s';
    container.appendChild(line);
    
    line.addEventListener('animationend', () => {
        line.remove();
        createCircuitLine();
    });
}

// Update complexity information
function updateComplexityInfo() {
    const algorithm = document.getElementById('algorithm').value;
    const complexity = timeComplexities[algorithm];
    if (complexity) {
        document.getElementById('time-complexity').innerHTML = 
            `Best: ${complexity.best}<br>
             Average: ${complexity.average}<br>
             Worst: ${complexity.worst}`;
    } else {
        document.getElementById('time-complexity').textContent = 'Select an algorithm';
    }
}

// Reset counters
function resetCounters() {
    comparisons = 0;
    swaps = 0;
    updateCounters();
}

// Update counters display
function updateCounters() {
    document.getElementById('comparison-count').textContent = comparisons;
    document.getElementById('swap-count').textContent = swaps;
}

// Logging function
function log(message) {
    const logContent = document.getElementById('log-content');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.textContent = message;
    logContent.insertBefore(logEntry, logContent.firstChild);
}

// Clear logs
function clearLogs() {
    document.getElementById('log-content').innerHTML = '';
}

// Generate new random array
function generateNewArray() {
    if (isAnimating) return;
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    resetCounters();
    displayBars();
    clearLogs();
    log('Generated new array with ' + arraySize + ' elements');
    saveState();
}

// Display bars and numbers
function displayBars() {
    const barsContainer = document.getElementById('bars-container');
    barsContainer.innerHTML = '';
    
    const maxValue = Math.max(...array);
    const barWidth = Math.max(8, Math.min(50, Math.floor(barsContainer.clientWidth / array.length) - 2));
    
    array.forEach((value, idx) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(value / maxValue) * 100}%`;
        bar.setAttribute('data-value', value);
        bar.style.width = `${barWidth}px`;
        barsContainer.appendChild(bar);
    });
}

// Update visualization
function updateBars(comparing = [], sorted = [], found = []) {
    const bars = document.querySelectorAll('.bar');
    const maxValue = Math.max(...array);
    
    bars.forEach((bar, idx) => {
        bar.style.height = `${(array[idx] / maxValue) * 100}%`;
        bar.setAttribute('data-value', array[idx]);
        bar.className = 'bar';
        if (comparing.includes(idx)) bar.classList.add('comparing');
        if (sorted.includes(idx)) bar.classList.add('sorted');
        if (found.includes(idx)) bar.classList.add('found');
    });
}

// Update array and display
function updateArray(newArray) {
    array = newArray;
    displayBars();
}

// Sleep function for animations with pause and stop support
async function sleep(ms) {
    // Convert the speed value (1-100) to a more appropriate delay
    // Using an exponential scale to make speed changes more noticeable
    // Speed 1 = ~2000ms delay (very slow)
    // Speed 50 = ~200ms delay (medium)
    // Speed 100 = ~10ms delay (very fast)
    const actualDelay = Math.floor(2000 * Math.pow(0.96, animationSpeed));
    
    while (isPaused) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (shouldStop) {
        shouldStop = false;
        isPaused = false;
        throw new Error('Algorithm stopped');
    }
    return new Promise(resolve => setTimeout(resolve, actualDelay));
}

// Stop the current algorithm
function stopAlgorithm() {
    shouldStop = true;
    isPaused = false;
    document.getElementById('stop-btn').disabled = true;
    document.getElementById('pause-btn').disabled = true;
    document.getElementById('start-btn').disabled = false;
}

// Pause/Resume the current algorithm
function pauseAlgorithm() {
    isPaused = !isPaused;
    const pauseBtn = document.getElementById('pause-btn');
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

// Start algorithm based on selection
async function startAlgorithm() {
    if (isAnimating) return;
    
    const algorithm = document.getElementById('algorithm').value;
    
    // For search algorithms, validate input first
    if (algorithm === 'linear' || algorithm === 'binary') {
        const searchInput = document.getElementById('search-value');
        const value = parseInt(searchInput.value);
        
        if (!searchInput.value.trim()) {
            log('Error: Please enter a number to search');
            return;
        }
        
        if (isNaN(value)) {
            log('Error: Please enter a valid number');
            return;
        }
        
        if (value < 1 || value > 100) {
            log('Error: Please enter a number between 1 and 100');
            return;
        }
        
        // For binary search, check if number could exist in the array
        if (algorithm === 'binary') {
            const maxPossible = Math.ceil(arraySize * (100 / arraySize));
            if (value > maxPossible) {
                log(`Error: For the current array size, maximum possible value is ${maxPossible}`);
                return;
            }
        }
        
        log(`Starting ${algorithm === 'binary' ? 'Binary' : 'Linear'} Search for value: ${value}`);
    }
    
    // Reset state
    isAnimating = true;
    shouldStop = false;
    isPaused = false;
    resetCounters();
    
    // Update UI
    document.getElementById('start-btn').disabled = true;
    document.getElementById('stop-btn').disabled = false;
    document.getElementById('pause-btn').disabled = false;
    
    const searchValue = parseInt(document.getElementById('search-value').value);
    
    try {
        switch(algorithm) {
            case 'bubble':
                await bubbleSort();
                break;
            case 'selection':
                await selectionSort();
                break;
            case 'insertion':
                await insertionSort();
                break;
            case 'merge':
                await mergeSort(0, array.length - 1);
                break;
            case 'quick':
                await quickSort(0, array.length - 1);
                break;
            case 'linear':
                await linearSearch(searchValue);
                break;
            case 'binary':
                await binarySearch(searchValue);
                break;
        }
    } catch (error) {
        if (error.message !== 'Algorithm stopped') {
            console.error(error);
            log('Error: ' + error.message);
        }
    } finally {
        isAnimating = false;
        shouldStop = false;
        isPaused = false;
        document.getElementById('start-btn').disabled = false;
        document.getElementById('stop-btn').disabled = true;
        document.getElementById('pause-btn').disabled = true;
        document.getElementById('pause-btn').textContent = 'Pause';
        saveState();
    }
}

// Bubble Sort
async function bubbleSort() {
    const n = array.length;
    const sorted = [];
    
    log('Starting Bubble Sort');
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            updateBars([j, j + 1], sorted);
            log(`Comparing ${array[j]} and ${array[j + 1]}`);
            await sleep(101 - animationSpeed);
            
            comparisons++;
            updateCounters();
            
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps++;
                updateCounters();
                log(`Swapping ${array[j]} and ${array[j + 1]}`);
                updateBars([j, j + 1], sorted);
            }
        }
        sorted.push(n - i - 1);
        log(`${array[n - i - 1]} is now in its sorted position`);
    }
    sorted.push(0);
    updateBars([], sorted);
    log('Bubble Sort completed');
    saveState();
}

// Selection Sort
async function selectionSort() {
    const n = array.length;
    const sorted = [];
    
    log('Starting Selection Sort');
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        log(`Finding minimum element from index ${i} to ${n-1}`);
        
        for (let j = i + 1; j < n; j++) {
            updateBars([minIdx, j], sorted);
            log(`Comparing ${array[j]} with current minimum ${array[minIdx]}`);
            await sleep(101 - animationSpeed);
            
            comparisons++;
            updateCounters();
            
            if (array[j] < array[minIdx]) {
                minIdx = j;
                log(`New minimum found: ${array[j]}`);
            }
        }
        
        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            swaps++;
            updateCounters();
            log(`Swapping ${array[minIdx]} with ${array[i]}`);
        }
        sorted.push(i);
        updateBars([], sorted);
    }
    sorted.push(n - 1);
    updateBars([], sorted);
    log('Selection Sort completed');
    saveState();
}

// Insertion Sort
async function insertionSort() {
    const n = array.length;
    const sorted = [];
    
    log('Starting Insertion Sort');
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        log(`Inserting ${key} into sorted portion`);
        
        while (j >= 0 && array[j] > key) {
            updateBars([j, j + 1], sorted);
            log(`Comparing ${key} with ${array[j]}`);
            await sleep(101 - animationSpeed);
            
            comparisons++;
            updateCounters();
            
            array[j + 1] = array[j];
            swaps++;
            updateCounters();
            j--;
        }
        array[j + 1] = key;
        sorted.push(i);
        updateBars([], sorted);
        log(`${key} inserted at position ${j + 1}`);
    }
    updateBars([], Array.from({length: n}, (_, i) => i));
    log('Insertion Sort completed');
    saveState();
}

// Merge Sort
async function mergeSort(start, end) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        log(`Dividing array from index ${start} to ${end}`);
        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await merge(start, mid, end);
    }
}

async function merge(start, mid, end) {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    
    log(`Merging subarrays: [${left}] and [${right}]`);
    
    while (i < left.length && j < right.length) {
        updateBars([k], [], []);
        await sleep(101 - animationSpeed);
        
        comparisons++;
        updateCounters();
        
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        swaps++;
        updateCounters();
        k++;
    }
    
    while (i < left.length) {
        array[k] = left[i];
        i++;
        k++;
        swaps++;
        updateCounters();
        updateBars([k-1], [], []);
        await sleep(101 - animationSpeed);
    }
    
    while (j < right.length) {
        array[k] = right[j];
        j++;
        k++;
        swaps++;
        updateCounters();
        updateBars([k-1], [], []);
        await sleep(101 - animationSpeed);
    }
    
    log(`Merged subarray from index ${start} to ${end}`);
    updateBars([], Array.from({length: k - start}, (_, i) => i + start));
    saveState();
}

// Quick Sort
async function quickSort(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
    if (low === 0 && high === array.length - 1) {
        updateBars([], Array.from({length: array.length}, (_, i) => i));
        log('Quick Sort completed');
        saveState();
    }
}

async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;
    
    log(`Partitioning array with pivot ${pivot}`);
    
    for (let j = low; j < high; j++) {
        updateBars([j, high], [], []);
        await sleep(101 - animationSpeed);
        
        comparisons++;
        updateCounters();
        
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            swaps++;
            updateCounters();
            log(`Swapping ${array[i]} and ${array[j]}`);
            updateBars([i, j], []);
        }
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    swaps++;
    updateCounters();
    return i + 1;
}

// Linear Search
async function linearSearch(target) {
    if (!target || isNaN(target)) {
        log('Please enter a valid number to search');
        return;
    }

    target = parseInt(target);
    if (target < 1 || target > 100) {
        log('Please enter a number between 1 and 100');
        return;
    }

    log(`Starting Linear Search for value ${target}`);
    log('Searching through each element one by one...');
    
    // Clear any previous highlights
    updateBars([], [], []);
    
    for (let i = 0; i < array.length; i++) {
        // Highlight current element being checked
        updateBars([i], [], []);
        log(`Checking element ${array[i]} at position ${i + 1}`);
        await sleep(101 - animationSpeed);
        
        comparisons++;
        updateCounters();
        
        if (array[i] === target) {
            // Highlight found element
            updateBars([], [], [i]);
            log(`✅ Found ${target} at position ${i + 1}!`);
            return;
        }
    }
    
    log(`❌ ${target} is not present in the array`);
    updateBars([], [], []); // Clear highlights
    saveState();
}

// Binary Search
async function binarySearch(target) {
    if (!target || isNaN(target)) {
        log('Please enter a valid number to search');
        return;
    }

    target = parseInt(target);
    if (target < 1 || target > 100) {
        log('Please enter a number between 1 and 100');
        return;
    }

    log(`Starting Binary Search for value ${target}`);
    log('Array is already sorted for binary search');
    
    let left = 0;
    let right = array.length - 1;
    let searchSpace = Array.from({length: array.length}, (_, i) => i);
    
    // Clear any previous highlights
    updateBars([], [], []);
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // Highlight current search space
        updateBars(searchSpace.slice(left, right + 1), [], [mid]);
        log(`Checking middle element ${array[mid]} at position ${mid + 1}`);
        await sleep(101 - animationSpeed);
        
        comparisons++;
        updateCounters();
        
        if (array[mid] === target) {
            updateBars([], [], [mid]);
            log(`✅ Found ${target} at position ${mid + 1}!`);
            return;
        }
        
        if (array[mid] < target) {
            left = mid + 1;
            log(`${target} is greater, searching positions ${left + 1} to ${right + 1}`);
        } else {
            right = mid - 1;
            log(`${target} is smaller, searching positions ${left + 1} to ${right + 1}`);
        }
        
        await sleep(101 - animationSpeed);
    }
    
    log(`❌ ${target} is not present in the array`);
    updateBars([], [], []); // Clear highlights
    saveState();
}

// Update algorithm information
function updateAlgorithmInfo() {
    const algorithm = document.getElementById('algorithm').value;
    const info = algorithmInfo[algorithm];
    
    console.log('Updating info for algorithm:', algorithm); // Debug log
    console.log('Algorithm info:', info); // Debug log
    
    if (!info) {
        console.error('No information found for algorithm:', algorithm);
        document.getElementById('algo-description').textContent = 'Select an algorithm to see details';
        document.getElementById('best-case').textContent = '-';
        document.getElementById('average-case').textContent = '-';
        document.getElementById('worst-case').textContent = '-';
        document.getElementById('space-complexity').textContent = '-';
        document.getElementById('stability').textContent = '-';
        document.getElementById('example-cases').innerHTML = '';
        return;
    }
    
    // Update basic information
    document.getElementById('algo-description').textContent = info.description;
    document.getElementById('best-case').textContent = info.bestCase;
    document.getElementById('average-case').textContent = info.averageCase;
    document.getElementById('worst-case').textContent = info.worstCase;
    document.getElementById('space-complexity').textContent = info.spaceComplexity;
    document.getElementById('stability').textContent = info.stable;
    
    // Update example cases
    const examplesContainer = document.getElementById('example-cases');
    examplesContainer.innerHTML = ''; // Clear existing examples
    
    if (info.examples && info.examples.length > 0) {
        info.examples.forEach(example => {
            const exampleElement = document.createElement('div');
            exampleElement.className = 'example-case';
            exampleElement.innerHTML = `
                <div class="example-title">${example.title}</div>
                <div class="example-description">${example.description}</div>
                <div class="example-explanation"><em>${example.explanation}</em></div>
            `;
            examplesContainer.appendChild(exampleElement);
        });
    }
    
    // Log the update
    log(`Updated information for ${info.name}`);
}

// Show/hide search controls based on algorithm type
function updateSearchControls() {
    const selectedAlgorithm = document.getElementById('algorithm').value;
    const searchControls = document.querySelector('.search-controls');
    const searchInput = document.getElementById('search-value');
    const searchBtn = document.querySelector('.search-btn');
    const arraySizeControl = document.getElementById('array-size');
    
    if (selectedAlgorithm === 'linear' || selectedAlgorithm === 'binary') {
        searchControls.style.display = 'flex';
        searchInput.style.display = 'block';
        searchBtn.style.display = 'block';
        searchInput.value = ''; // Clear previous value
        
        // Update placeholder based on algorithm type
        searchInput.placeholder = 'Enter number (1-100)';
        
        if (selectedAlgorithm === 'binary') {
            // For binary search, create a sorted array
            array = Array.from({length: arraySize}, (_, i) => Math.ceil((i + 1) * (100 / arraySize)));
            displayBars();
            arraySizeControl.disabled = true;
            log('Generated sorted array for binary search');
        } else {
            // For linear search, allow random array
            arraySizeControl.disabled = false;
            generateNewArray();
            log('Generated random array for linear search');
        }
    } else {
        searchControls.style.display = 'none';
        arraySizeControl.disabled = false;
    }
    
    // Update visualization
    displayBars();
}

// Validate search input and start search
function validateAndSearch() {
    const searchInput = document.getElementById('search-value');
    const value = parseInt(searchInput.value);
    const algorithm = document.getElementById('algorithm').value;
    
    if (!searchInput.value.trim()) {
        alert('Please enter a number to search');
        return;
    }
    
    if (isNaN(value)) {
        alert('Please enter a valid number');
        return;
    }
    
    if (value < 1 || value > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }
    
    // For binary search, check if number could exist in the array
    if (algorithm === 'binary') {
        const maxPossible = Math.ceil(arraySize * (100 / arraySize));
        if (value > maxPossible) {
            alert(`For the current array size, maximum possible value is ${maxPossible}`);
            return;
        }
    }
    
    startAlgorithm();
}

// Save current state
function saveState() {
    const state = {
        arraySize: arraySize,
        array: array,
        algorithm: document.getElementById('algorithm').value,
        speed: animationSpeed,
        comparisons: comparisons,
        swaps: swaps,
        isAnimating: isAnimating,
        isPaused: isPaused
    };
    localStorage.setItem('algoVisualizerState', JSON.stringify(state));
}

// Restore state
function restoreState() {
    const savedState = localStorage.getItem('algoVisualizerState');
    if (savedState) {
        const state = JSON.parse(savedState);
        
        // Restore values
        arraySize = state.arraySize;
        array = state.array;
        animationSpeed = state.speed;
        comparisons = state.comparisons || 0;
        swaps = state.swaps || 0;
        
        // Update UI elements
        document.getElementById('array-size').value = arraySize;
        document.getElementById('size-value').textContent = arraySize;
        document.getElementById('speed').value = animationSpeed;
        document.getElementById('speed-value').textContent = animationSpeed;
        document.getElementById('algorithm').value = state.algorithm;
        
        // Update visualization
        displayBars();
        updateComplexityInfo();
        updateAlgorithmInfo();
        updateSearchControls();
        updateCounters();
    }
}

// Add event listener for visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        restoreState();
    }
});

// Add event listener for changes that should be saved
['array-size', 'speed', 'algorithm'].forEach(id => {
    document.getElementById(id).addEventListener('change', saveState);
});