import * as React from 'react';
import { useState, useEffect } from 'react';
import GraphCard from '../components/GraphCard';
import GraphLine from '../components/GraphLine';
import GraphPie from '../components/GraphPie';

import { Box } from '@mui/material';

type Props = {
  dbUri: string;
};

function DBTab(props: Props) {
  type FetchData = {
    [key: string]: any;
  };

  const initialFetchData: FetchData = {};

  const [fetchData, setFetchData] = useState(initialFetchData);
  const [graph1, setGraph1] = useState<JSX.Element>();
  const [graph2, setGraph2] = useState<JSX.Element>();

  function getMetrics(uri: string) {
    fetch('/api/querytimes', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ uri: uri }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFetchData(data);
      })
      .catch((error) => console.log('ERROR: could not post-fetch: ' + error));
  }

  function parseData(fetchData: FetchData) {
    const labels: string[] = [];
    const data: number[] = [];

    const pie: {
      'time < .1s'?: number;
      '.1s > time < .5s'?: number;
      '.5s > time < 1s'?: number;
      '1s < time'?: number;
    } = {
      'time < .1s': 0,
      '.1s > time < .5s': 0,
      '.5s > time < 1s': 0,
      '1s < time': 0,
    };

    fetchData.selectQueryTime.forEach(
      (element: { query: string; mean_exec_time: number }) => {
        labels.push(element.query);
        data.push(element.mean_exec_time);
        if (element.mean_exec_time < 0.1) {
          pie['time < .1s']++;
        } else if (
          element.mean_exec_time > 0.1 &&
          element.mean_exec_time < 0.5
        ) {
          pie['.1s > time < .5s']++;
        } else if (element.mean_exec_time > 0.5 && element.mean_exec_time < 1) {
          pie['.5s > time < 1s']++;
        } else if (element.mean_exec_time > 1) {
          pie['1s < time']++;
        }
      }
    );

    setGraph1(<GraphLine labels={labels} data={data} />);
    setGraph2(<GraphPie labels={Object.keys(pie)} data={Object.values(pie)} />);
  }

  useEffect(() => {
    getMetrics(props.dbUri);
  }, []);

  useEffect(() => {
    if (Object.keys(fetchData).length !== 0) {
      parseData(fetchData);
    }
  }, [fetchData]);

  if (Object.keys(fetchData).length === 0) {
    return (
      <div>
        <Box
          sx={{ display: 'inline-flex', flexWrap: 'wrap', pl: '11rem' }}
        ></Box>
      </div>
    );
  } else {
    return (
      <div>
        <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', pl: '11rem' }}>
          <GraphCard cardLabel="Database Name">
            <>
              name: {fetchData.dbStats[0].datname}
              <br />
              id: {fetchData.dbStats[0].datid}
            </>
          </GraphCard>
          {graph1}
          {graph2}
          <GraphCard cardLabel="Conflicts">{fetchData.conflicts}</GraphCard>
          <GraphCard cardLabel="Deadlocks">{fetchData.deadlocks}</GraphCard>
          <GraphCard cardLabel="Rolled Back Transactions">
            {fetchData.rolledBackTransactions}
          </GraphCard>
          <GraphCard cardLabel="Transactions Committed">
            {fetchData.transactionsCommitted}
          </GraphCard>
          <GraphCard cardLabel="Cache Hit Ratio">
            {Number(fetchData.cacheHitRatio[0].ratio).toFixed(4)}
          </GraphCard>
          <GraphCard cardLabel="Bulk Read Time">
            {fetchData.dbStats[0].blk_read_time}
          </GraphCard>
          <GraphCard cardLabel="Bulk Write Time">
            {fetchData.dbStats[0].blk_write_time}
          </GraphCard>
          <GraphCard cardLabel="Bulk Hits">
            {fetchData.dbStats[0].blks_hit}
          </GraphCard>
          <GraphCard cardLabel="Bulk Reads">
            {fetchData.dbStats[0].blks_read}
          </GraphCard>
          <GraphCard cardLabel="Checksum Failures">
            {fetchData.dbStats[0].checksum_failures}
          </GraphCard>
          <GraphCard cardLabel="Bulk Read Time">
            {fetchData.dbStats[0].blk_read_time}
          </GraphCard>
        </Box>
      </div>
    );
  }
}

export default DBTab;
