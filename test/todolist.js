const OurTodoApp = artifacts.require("OurTodoApp");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('OurTodoApp testing', ([account1, account2, account3]) => {
    var ourTodoApp;

    before(async () => {
        ourTodoApp = await OurTodoApp.deployed();
    })

    describe('deploy smart-contract', async () => {
        it('doployed successfully', async () => {
            const address = await ourTodoApp.address;
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    describe('create todo', async () => {

        it('before todo created', async () => {
            const taskCount1 = await ourTodoApp.getTotalTodo({from:account1});
            const taskCount2 = await ourTodoApp.getTotalTodo({from:account2});
            const taskCount3 = await ourTodoApp.getTotalTodo({from:account3});

            assert.equal(taskCount1.toNumber(), 0);
            assert.equal(taskCount2.toNumber(), 0);
            assert.equal(taskCount3.toNumber(), 0);
        })

        it('create todo task by account 1', async () => {
            const result = await ourTodoApp.createTodo("task 1 by account 1", { from: account1 });
            const taskCount1 = await ourTodoApp.getTotalTodo({from:account1});
            const taskCount2 = await ourTodoApp.getTotalTodo({from:account2});
            const taskCount3 = await ourTodoApp.getTotalTodo({from:account3});
            
            assert.equal(taskCount1.toNumber(), 1);
            assert.equal(taskCount2.toNumber(), 0);
            assert.equal(taskCount3.toNumber(), 0);

            const todotask = await ourTodoApp.getTodo(taskCount1,{from:account1});

            assert.equal(todotask.id, 1);
            assert.equal(todotask.content, 'task 1 by account 1');
            assert.equal(todotask.completed, false);
        
        })

        it('create todo task by account 2', async () => {
            const result = await ourTodoApp.createTodo("task 1 by account 2", { from: account2 });
            const taskCount1 = await ourTodoApp.getTotalTodo({from:account1});
            const taskCount2 = await ourTodoApp.getTotalTodo({from:account2});
            const taskCount3 = await ourTodoApp.getTotalTodo({from:account3});
            
            assert.equal(taskCount1.toNumber(), 1);
            assert.equal(taskCount2.toNumber(), 1);
            assert.equal(taskCount3.toNumber(), 0);

            const todotask = await ourTodoApp.getTodo(taskCount2,{from:account2});

            assert.equal(todotask.id, 1);
            assert.equal(todotask.content, 'task 1 by account 2');
            assert.equal(todotask.completed, false);
        
        })

        it('create todo task by account 3', async () => {
            const result = await ourTodoApp.createTodo("task 1 by account 3", { from: account3 });
            const taskCount1 = await ourTodoApp.getTotalTodo({from:account1});
            const taskCount2 = await ourTodoApp.getTotalTodo({from:account2});
            const taskCount3 = await ourTodoApp.getTotalTodo({from:account3});
            
            assert.equal(taskCount1.toNumber(), 1);
            assert.equal(taskCount2.toNumber(), 1);
            assert.equal(taskCount3.toNumber(), 1);

            const todotask = await ourTodoApp.getTodo(taskCount3,{from:account3});

            assert.equal(todotask.id, 1);
            assert.equal(todotask.content, 'task 1 by account 3');
            assert.equal(todotask.completed, false);
        })

        it('create todo task by account 1 2 3', async () => {
            await ourTodoApp.createTodo("task 2 by account 1", { from: account1 });
            await ourTodoApp.createTodo("task 2 by account 2", { from: account2 });
            await ourTodoApp.createTodo("task 2 by account 3", { from: account3 });

            const taskCount1 = await ourTodoApp.getTotalTodo({from:account1});
            const taskCount2 = await ourTodoApp.getTotalTodo({from:account2});
            const taskCount3 = await ourTodoApp.getTotalTodo({from:account3});
            
            assert.equal(taskCount1.toNumber(), 2);
            assert.equal(taskCount2.toNumber(), 2);
            assert.equal(taskCount3.toNumber(), 2);

            const todotask1 = await ourTodoApp.getTodo(taskCount1,{from:account1});
            const todotask2 = await ourTodoApp.getTodo(taskCount2,{from:account2});
            const todotask3 = await ourTodoApp.getTodo(taskCount3,{from:account3});

            assert.equal(todotask1.id, 2);
            assert.equal(todotask1.content, 'task 2 by account 1');
            assert.equal(todotask1.completed, false);
            assert.equal(todotask2.id, 2);
            assert.equal(todotask2.content, 'task 2 by account 2');
            assert.equal(todotask2.completed, false);
            assert.equal(todotask3.id, 2);
            assert.equal(todotask3.content, 'task 2 by account 3');
            assert.equal(todotask3.completed, false);
        })


    })

    describe('check setcompleted',async()=>{

        it('check toggle working correctly', async () => {
            await ourTodoApp.setTodoCompleted(2,{from:account1});

            const todotask1 = await ourTodoApp.getTodo(2,{from:account1});

            assert.equal(todotask1.id, 2);
            assert.equal(todotask1.content, 'task 2 by account 1');
            assert.equal(todotask1.completed, true);
    
        })
    })


})