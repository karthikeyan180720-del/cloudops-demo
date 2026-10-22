
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Project') {
            steps {
                sh 'git --version'
                sh 'node --version'
                sh 'npm --version'
                sh 'ls -la'
            }
        }
    }
}
