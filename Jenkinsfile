pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'shivaraj438/online-medicine:latest'
    }

    stages {
        stage('Pull Latest Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ShivarajYadavannavar438/Online_medicine.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push ${DOCKER_IMAGE}'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker stop online-medicine || true'
                sh 'docker rm online-medicine || true'
                sh 'docker run -d --name online-medicine -p 80:80 ${DOCKER_IMAGE}'
                echo 'Website is live at http://localhost:80'
            }
        }
    }

    post {
        success { echo 'Deployment Successful! Visit http://localhost:80' }
        failure { echo 'Deployment Failed!' }
    }
}
