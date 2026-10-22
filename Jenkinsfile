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
                bat 'git --version'
                bat 'node --version'
                bat 'npm --version'
                bat 'dir'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }
    }
}
