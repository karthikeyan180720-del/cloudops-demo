
pipeline {
    agent any

    environment {
  IMAGE_NAME = 'karthik180720/cloudops-demo:1.0.0'
        NAMESPACE = 'cloudops'
        DEPLOYMENT = 'cloudops-demo'
        CONTAINER = 'cloudops-demo'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Project') {
            steps {
                sh '''
                    git --version
                    node --version
                    npm --version
                    ls -la
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test --if-present'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Docker Hub Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                          -u "$DOCKER_USER" --password-stdin
                        docker push "$IMAGE_NAME"
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                sh '''
                    kubectl -n "$NAMESPACE" set image \
                      deployment/"$DEPLOYMENT" \
                      "$CONTAINER"="$IMAGE_NAME" \
                      --kubeconfig=/var/lib/jenkins/.kube/config

                    kubectl -n "$NAMESPACE" rollout status \
                      deployment/"$DEPLOYMENT" \
                      --kubeconfig=/var/lib/jenkins/.kube/config
                '''
            }
        }

        stage('Verify Pods') {
            steps {
                sh '''
                    kubectl get pods -n "$NAMESPACE" \
                      --kubeconfig=/var/lib/jenkins/.kube/config
                '''
            }
        }
    }
}
