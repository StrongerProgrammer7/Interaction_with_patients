const addressContract = "0x8535972D82B4408bc57Dbd4BeAE0f96f97EcD9F6"

                            const ABI = [{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"role","type":"string"},{"indexed":false,"internalType":"address","name":"doctor","type":"address"}],"name":"GetRole","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"func","type":"string"},{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"Log","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"notice","type":"string"},{"indexed":false,"internalType":"address","name":"patient","type":"address"},{"indexed":false,"internalType":"uint256","name":"number","type":"uint256"},{"indexed":false,"internalType":"address","name":"contractPatient","type":"address"}],"name":"NewPatient","type":"event"},{"stateMutability":"nonpayable","type":"fallback"},{"inputs":[{"internalType":"address","name":"_doctor","type":"address"}],"name":"anualRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_patient","type":"address"}],"name":"checkAccess","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"createPatient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCountPatient","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_doctor","type":"address"}],"name":"giveRole","outputs":[],"stateMutability":"nonpayable","type":"function"}]