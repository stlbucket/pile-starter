#!/usr/bin/env node
const config = require('../execa.config')
const applyPkgCmd = require('./applyPkgCmd')

// console.log(config)


// applyPkgCmd('DEPLOY', config.packages, (pkg) => `cd release && sqitch deploy --target app-roles`)


const execa = require('execa');

(async () => {
	// Pipe the child process stdout to the current stdout
	// execa('echo', ['unicorns']).stdout.pipe(process.stdout);


	// Run a shell command
	// const {stdout} = await execa.shell('echo unicorns');
  // console.log(stdout)
  //=> 'unicorns'
  


	// Catching an error
	try {
    // await execa.shell('exit 3');
    await execa.shell('cd release');
    let { stdout } = await execa.shell('sqitch deploy --target app-roles');
    console.log(stdout)
    
	} catch (error) {
		console.log(error);
		/*
		{
			message: 'Command failed: /bin/sh -c exit 3'
			killed: false,
			code: 3,
			signal: null,
			cmd: '/bin/sh -c exit 3',
			stdout: '',
			stderr: '',
			timedOut: false
		}
		*/
	}
})();

