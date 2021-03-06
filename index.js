#!/usr/bin/env node

var program = require('commander');
const downloadGitRepo = require('download-git-repo')
const inquirer = require('inquirer');
const ora = require('ora');


program
    .command('init') //声明hi下有一个命令叫list
    .description('list files in current working directory') //给出list这个命令的描述
    .option('-a, --all', 'Whether to display hidden files') //设置list这个命令的参数
    .action(function(options) { //list命令的实现体
     
        inquirer.prompt([{
            type: 'input',
            name: 'blogName',
            message: '博客名字?',
            default: 'Phoenix-Deng'
        }]).then((answers) => {
            const spinner = ora('项目初始化中,请耐心稍等...').start();
            console.log('目录名:'+answers.blogName)
            downloadGitRepo('github:nigulasikk/mdblog#dev', './' + answers.blogName, { clone: true }, err => {
                spinner.stop();
                if(!err){
                    spinner.succeed();
                    console.log('项目初始化成功!');
                    console.log('cd ' + answers.blogName);
                    console.log('');
                } else {
                    spinner.fail();
                    console.log('项目初始化失败!');
                    console.log(err);
                }
            })
        })
       

    });

program.parse(process.argv);