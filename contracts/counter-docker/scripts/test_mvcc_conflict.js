const { WECounterDocker } = require("./Contract");

async function main() {
    const contract = await WECounterDocker.load()
    const sentTxs = await Promise.all([contract.decrement(1), contract.set(0)])
    return sentTxs.map((tx) => { return tx.id })
}

main().then((tx_ids) => {
    for (id of tx_ids) {
        console.log(id)
    }
    console.error("Success")
}).catch((err) => {
    console.error(err)
});

// results:
// 7P1LUXyZo9x6bv6uMovUMTsQbkfqeaSMzhMkSNE5M6iy - decrement tx id
// 2WyezyxW8AStsuGm7smWDohcTVj32Thp51PKVjbheA5Z - set tx id

// contract container logs:
/*
2Wyezy... on height 1504: called set to 0
7P1LUX... on height 1504: decrement(1): read counter value 2
---------------
7P1LUX... on height 1504: decrement(1): read counter value 0
7P1LUX... on height 1505: decrement(1): read counter value 0
*/

/*
$ docker logs node-0 2>/dev/null | grep -E "7P1LUXyZo9x6bv6uMovUMTsQbkfqeaSMzhMkSNE5M6iy|2WyezyxW8AStsuGm7smWDohcTVj32Thp51PKVjbheA5Z"
2024-05-07 15:52:59,954 DEBUG [or.default-dispatcher-103] c.w.utx.UtxPoolImpl - Added new tx: 7P1LUXyZo9x6bv6uMovUMTsQbkfqeaSMzhMkSNE5M6iy
2024-05-07 15:52:59,957 DEBUG [or.default-dispatcher-102] c.w.utx.UtxPoolImpl - Added new tx: 2WyezyxW8AStsuGm7smWDohcTVj32Thp51PKVjbheA5Z
2024-05-07 15:53:00,515 DEBUG [miner-pool-105] c.w.d.MinerTransactionsExecutor - Start executing contract transaction '7P1LUXyZo9x6bv6uMovUMTsQbkfqeaSMzhMkSNE5M6iy'
2024-05-07 15:53:00,520 DEBUG [miner-pool-105] c.w.d.MinerTransactionsExecutor - Start executing contract transaction '2WyezyxW8AStsuGm7smWDohcTVj32Thp51PKVjbheA5Z'
2024-05-07 15:53:01,548 DEBUG [miner-pool-96] c.w.d.MinerTransactionsExecutor - Built executed transaction '3bERT4womv79nFNAv3nGeQNbnyuCVw4y98RdYnpw8ymK' for '2WyezyxW8AStsuGm7smWDohcTVj32Thp51PKVjbheA5Z'
2024-05-07 15:53:02,557 DEBUG [miner-pool-105] c.w.d.MinerTransactionsExecutor - Built executed transaction '38YN5cTmciJNAiTkHGzzgxguaWXX8KviLgPjbVVXK1EG' for '7P1LUXyZo9x6bv6uMovUMTsQbkfqeaSMzhMkSNE5M6iy'
2024-05-07 15:53:02,558 DEBUG [miner-pool-105] c.w.d.MinerTransactionsExecutor - Executed tx '38YN5cTmciJNAiTkHGzzgxguaWXX8KviLgPjbVVXK1EG' for '7P1LUXyZo9x6bv6uMovUMTsQbkfqeaSMzhMkSNE5M6iy' was discarded because it caused MVCC conflict
2024-05-07 15:53:03,528 DEBUG [miner-pool-95] c.w.d.MinerTransactionsExecutor - Start executing contract transaction '7P1LUXyZo9x6bv6uMovUMTsQbkfqeaSMzhMkSNE5M6iy'
2024-05-07 15:53:05,562 DEBUG [miner-pool-113] c.w.d.MinerTransactionsExecutor - Built executed transaction 'E76sb49uYQHYQg2vC3uU98Rcm8fENTHYUtn2XHKvH9jN' for '7P1LUXyZo9x6bv6uMovUMTsQbkfqeaSMzhMkSNE5M6iy'
2024-05-07 15:53:08,688 DEBUG [miner-pool-145] c.w.d.MinerTransactionsExecutor - Start executing contract transaction '7P1LUXyZo9x6bv6uMovUMTsQbkfqeaSMzhMkSNE5M6iy'
2024-05-07 15:53:10,722 DEBUG [miner-pool-104] c.w.d.MinerTransactionsExecutor - Built executed transaction 'BPgphpGsxX4A16EVrkhWhDka7uoxVUvCq2YrPkzejkzG' for '7P1LUXyZo9x6bv6uMovUMTsQbkfqeaSMzhMkSNE5M6iy'
*/
