TypeScript React Table Cell Update Demo
=================================

这个项目演示了 antd Table 组件中 `shouldCellUpdate` 和 `onCell` 的工作机制及其局限性。

运行方式
-------

```
pnpm install
pnpm start
```

它会自动在浏览器中打开页面。

关于 shouldCellUpdate 和 onCell
---------------------------

### 基本用法

- `shouldCellUpdate` 用于控制单元格是否需要重新渲染
- `onCell` 用于为单元格添加属性（如样式、事件等）

### 重要发现

1. `shouldCellUpdate` 的设计局限
   - 函数签名：`shouldCellUpdate?: (record: RecordType, prevRecord: RecordType) => boolean`
   - 只能访问到当前和之前的记录数据
   - 无法访问列配置或其他上下文信息

2. `onCell` 返回新对象的问题
   - 每次渲染时 `onCell` 返回新的对象会导致引用不同
   - 无法在 `shouldCellUpdate` 中直接比较 `onCell` 的返回值
   - 即使使用 useMemo 缓存返回值也无法解决这个问题，因为 shouldCellUpdate 无法访问到这个值

### 解决方案

当需要基于 UI 属性（如样式）来控制更新时，只有两个可行的选择：

1. 放弃使用 `shouldCellUpdate`
   - 让组件自然更新
   - 适用于 UI 变化频繁的场景

2. 将 UI 状态放入 record 数据
   - 把样式信息作为数据的一部分
   - 这样可以在 `shouldCellUpdate` 中进行比较
   ```typescript
   interface DataType {
     key: string;
     name: string;
     color: string;  // 将UI状态作为数据的一部分
   }
   ```

### 最佳实践

1. `shouldCellUpdate` 主要用于优化基于数据变化的渲染
2. 如果需要基于 UI 属性控制更新，建议：
   - 对于简单的 UI 变化，放弃使用 shouldCellUpdate
   - 对于复杂的 UI 状态，将其作为数据的一部分
3. 要清楚认识到 shouldCellUpdate 的设计意图是用于数据比较，而不是 UI 属性比较

示例代码
-------

查看 `src/Hello.tsx` 了解完整的演示代码。
