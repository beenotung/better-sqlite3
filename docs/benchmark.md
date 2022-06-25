# Benchmark

To run the benchmark yourself:

```bash
git clone https://github.com/JoshuaWise/better-sqlite3.git
cd better-sqlite3
npm install # if you're doing this as the root user, --unsafe-perm is required
node benchmark
```

# Results

These results are from 07/25/2022, on a system76 kudu3 (i7, Oct 2016, 5.17.4-arch), using nodejs v16.14.2.

```
--- reading rows individually ---
better-sqlite3       x 250,792 ops/sec ±0.13%
better-sqlite3-proxy x 73,616 ops/sec ±0.22%
node-sqlite3         x 20,073 ops/sec ±0.43%

--- reading 100 rows into an array ---
better-sqlite3       x 7,187 ops/sec ±0.21%
better-sqlite3-proxy x 9 ops/sec ±3.33%
node-sqlite3         x 2,167 ops/sec ±0.41%

--- iterating over 100 rows ---
better-sqlite3       x 5,848 ops/sec ±0.26%
better-sqlite3-proxy x 9 ops/sec ±3.96%
node-sqlite3         x 203 ops/sec ±1.62%

--- inserting rows individually ---
better-sqlite3       x 21,264 ops/sec ±11.7%
better-sqlite3-proxy x 20,155 ops/sec ±9.34%
node-sqlite3         x 9,251 ops/sec ±9.02%

--- inserting 100 rows in a single transaction ---
better-sqlite3       x 2,829 ops/sec ±7.19%
better-sqlite3-proxy x 1,677 ops/sec ±6.24%
node-sqlite3         x 130 ops/sec ±3.63%
```

> All benchmarks are executed in [WAL mode](./performance.md).
