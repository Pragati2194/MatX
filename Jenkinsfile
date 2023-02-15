pipeline {
    agent any

tools {
   nodejs 'Node16.13.1'
}
   
parameters {
  choice choices: ['DEV', 'QA', 'PROD','UAT'], name: 'ENVIRONMENT'
  string defaultValue: 'build', name: 'BRANCH'
}

    stages {
        stage('CheckOut') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            when {
                expression { 
                   return params.ENVIRONMENT == 'DEV'
                }
            }
            steps {
                 sh 'cd /var/lib/jenkins/workspace/PMS/profile-management-system && ls && npm install && npm install -g env-cmd && npm run build:dev'
                 echo "Build completed Successfully"
            }
            
        }
        stage('Build:QA') {
            when {
                expression { 
                   return params.ENVIRONMENT == 'QA'
                }
            }
            steps {
                 sh 'cd /var/lib/jenkins/workspace/PMS/profile-management-system && ls && npm install && npm install -g env-cmd && npm run build:qa'
                 echo "Build completed Successfully"
            }
            
        }
        stage('Build:UAT') {
            when {
                expression { 
                   return params.ENVIRONMENT == 'UAT'
                }
            }
            steps {
                 sh 'cd /var/lib/jenkins/workspace/PMS/profile-management-system && ls && npm install && npm install -g env-cmd && npm run build:uat'
                 echo "Build completed Successfully"
            }
            
        }
        stage('Deploy to DEV') {
             when {
                expression { 
                   return params.ENVIRONMENT == 'DEV'
                }
            }
            steps {
                echo 'Deploying the build file to the server'
                       sshagent(credentials : ['a5a073bd-e907-40b4-8a9a-b792391369e4']) {
                        sh "ssh -o StrictHostKeyChecking=no root@192.168.1.50 uptime"
                        sh "scp -r $WORKSPACE/profile-management-system/build root@192.168.1.50:/var/www/html/pms"
                  }
                
            }
        }
        stage('Deploy to QA') {
             when {
                expression { 
                   return params.ENVIRONMENT == 'QA'
                }
            }
            steps {
                echo 'Deploying the build file to the server'
                       sshagent(credentials : ['a5a073bd-e907-40b4-8a9a-b792391369e4']) {
                        sh "ssh -o StrictHostKeyChecking=no root@192.168.1.176 uptime"
                        sh "scp -r $WORKSPACE/profile-management-system/build root@192.168.1.176:/home/rms-qa/Resume-Management-System/Profile_Management_System/profile-management-system"
                  }
                
            }
        }
        stage('Deploy to UAT') {
             when {
                expression { 
                   return params.ENVIRONMENT == 'UAT'
                }
            }
            steps {
                echo 'Deploying the build file to the server'
                       sshagent(credentials : ['a5a073bd-e907-40b4-8a9a-b792391369e4']) {
                        sh "ssh -o StrictHostKeyChecking=no root@192.168.1.94 uptime"
                        sh "scp -r $WORKSPACE/profile-management-system/build root@192.168.1.94:/home/rms-uat/Profile_Management_System/profile-management-system"
                  }
                
            }
        }
        
    }
}
