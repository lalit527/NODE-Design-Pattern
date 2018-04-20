function task1(callback) {
    asyncOperation(() => {
        task2(callback);
    });
}

function task2(callback) {
    asyncOperation(() => {
        task3(callback);
    });
}

function task3(callback) {
    asyncOperation(() => {
        callback();
    });
}

task1(() => {
    console.log('tasks 1, 2, 3 extecuted');
}); 