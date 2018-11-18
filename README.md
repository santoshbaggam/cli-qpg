# CLI-QPG

A simple CLI based application to generate question paper based on the number of marks and distribution of marks based on difficulty.

## Getting Started

The following instructions will let you clone/download this app up and running on your local machine.

### Prerequisites

Node v9.8.0 is required to run this application.

Run the below command to see which version of node you've installed on your machine.
```
node -v
```

### Installation

Simply clone the application and run the commands below inside the cli-qpg directory.

```
git clone git@github.com:santoshbaggam/cli-qpg.git
cd cli-qpg
npm install
npm link
```

## Usage

Simply run the below command to see the auto generated questions.

```
cli-qpg --marks=100 --easy=30 --medium=40 --hard=30
```

> Note: The --marks flag is required while the easy, medium and hard are optional and takes default values of 30, 30 and 40 respectively.
