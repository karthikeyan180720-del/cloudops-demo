stage('Deploy Kubernetes') {
    steps {
        sh '''
            kubectl -n cloudops \
            set image deployment/cloudops-demo \
            cloudops-demo=karthik200618/cloudops-demo:${VERSION}

            kubectl -n cloudops \
            rollout status deployment/cloudops-demo
        '''
    }
}
