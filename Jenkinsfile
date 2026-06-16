pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh '''
                    ls -la
                    ls -la frontend/ || echo "frontend folder not found at workspace root"
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh 'nohup npx serve frontend -l 5000 --no-clipboard > /tmp/serve.log 2>&1 &'
                sh 'sleep 3 && echo "Website is live at http://localhost:5000"'
            }
        }
    }

    post {
        success { echo 'SUCCESS - Visit http://localhost:5000' }
        failure { echo 'FAILED - Check console output' }
    }
}
