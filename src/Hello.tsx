import React, { FC, useState, useMemo } from 'react';
import { Table, Button, Switch } from 'antd';
import './Hello.pcss';

interface DataType {
  key: string;
  name: string;
  age: number;
}

const colors = ['#ff4d4f', '#52c41a', '#1890ff', '#722ed1', '#fa8c16'];

const data: DataType[] = [
  { key: '1', name: 'John', age: 30 },
  { key: '2', name: 'Jim', age: 25 },
];

export const Hello: FC = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const currentColor = colors[colorIndex];

  const cellStyle = useMemo(() => ({
    style: { color: currentColor }
  }), [currentColor]);

  const getColumnProps = (dataIndex: string) => ({
    title: dataIndex.charAt(0).toUpperCase() + dataIndex.slice(1),
    dataIndex,
    key: dataIndex,
    onCell: () => cellStyle,
    shouldCellUpdate: (record: DataType, prevRecord: DataType) => {
      return shouldUpdate;
    },
  });

  const columns = [
    getColumnProps('name'),
    getColumnProps('age'),
  ];

  const handleColorChange = () => {
    setColorIndex((prev) => (prev + 1) % colors.length);
  };

  return (
    <div className="Hello">
      <h1>Cell Update Demo</h1>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <Button 
          onClick={handleColorChange}
          style={{ 
            backgroundColor: currentColor,
            color: '#fff',
            border: 'none'
          }}
        >
          Change Cell Color ({colorIndex + 1}/{colors.length})
        </Button>
        <div>
          Allow Cell Update: 
          <Switch 
            checked={shouldUpdate}
            onChange={setShouldUpdate}
            style={{ marginLeft: 8 }}
          />
        </div>
      </div>
      <Table 
        columns={columns} 
        dataSource={data}
      />
      <div style={{ marginTop: 16 }}>
        <h3>说明：</h3>
        <ul>
          <li>shouldCellUpdate 只能访问到 record 数据，无法访问列配置</li>
          <li>如果需要基于 style 变化来更新单元格，应该：</li>
          <li>1. 要么放弃使用 shouldCellUpdate</li>
          <li>2. ���么将样式信息也放入 record 数据中</li>
          <li>3. 要么像这个例子一样，使用 useMemo 缓存 style 对象，并用开关控制更新</li>
          <li>当前示例中，即使 style 对象被缓存，单元格的更新仍然完全由 shouldUpdate 控制</li>
        </ul>
      </div>
    </div>
  );
};
