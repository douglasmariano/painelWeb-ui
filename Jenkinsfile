pipeline {
  agent {
    docker { image 'node:latest' }
  }
  stages {
    stage('Install') {
      steps { sh 'export NODE_OPTIONS=--openssl-legacy-provider; npm install --legacy-peer-deps' }
    }
 
    stage('Build') {
      steps { sh 'export NODE_OPTIONS=--openssl-legacy-provider; npm run-script build' }
    }
  }
}