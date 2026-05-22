pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-creds'
        DOCKERHUB_USERNAME       = 'prashik536'
        IMAGE_NAME               = 'bike-frontend'
        IMAGE_TAG                = "${env.BUILD_NUMBER}"
        DEPLOY_SSH_CREDENTIALS_ID = 'ec2-ssh-key'
        DEPLOY_HOST               = '172.31.15.215'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker Image...'
                // Build the frontend Docker image using the Dockerfile
                sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub and pushing frontend image...'
                withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to Target EC2') {
            steps {
                echo 'Deploying to remote EC2 instance via SSH...'
                withCredentials([
                    sshUserPrivateKey(credentialsId: env.DEPLOY_SSH_CREDENTIALS_ID, keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')
                ]) {
                    sh """
                        ssh -i \${SSH_KEY} -o StrictHostKeyChecking=no \${SSH_USER}@\${DEPLOY_HOST} "
                            echo 'Connected to remote EC2. Updating frontend application...'
                            
                            # Pull the latest frontend image from Docker Hub
                            docker pull \${DOCKERHUB_USERNAME}/\${IMAGE_NAME}:latest
                            
                            # Stop and remove the existing frontend container if it is running
                            docker stop \${IMAGE_NAME} || true
                            docker rm \${IMAGE_NAME} || true
                            
                            # Run the new container with the specified configuration
                            docker run -d --name \${IMAGE_NAME} --network bike-network -p 80:80 \${DOCKERHUB_USERNAME}/\${IMAGE_NAME}:latest
                            
                            echo 'Frontend deployment completed successfully!'
                        "
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up local Docker images on the Jenkins agent...'
            sh "docker rmi \${DOCKERHUB_USERNAME}/\${IMAGE_NAME}:\${IMAGE_TAG} || true"
            sh "docker rmi \${DOCKERHUB_USERNAME}/\${IMAGE_NAME}:latest || true"
        }
    }
}
