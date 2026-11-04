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

        stage('Deploy Kubernetes') {
            steps {
               bat '''
    "C:\\Users\\acer\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\kubectl.exe" -n cloudops set image deployment/cloudops-demo cloudops-demo=karthik200618/cloudops-demo:1.0.0
    "C:\\Users\\acer\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\kubectl.exe" -n cloudops rollout status deployment/cloudops-demo
'''
            }
        }
    }
}
