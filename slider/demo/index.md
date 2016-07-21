## 示例
### 基本形式

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6"><slider /></div>
    <div class="g-col g-col-6"><slider value=20 /></div>
</div>
```

### 只读和禁用

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6"><slider value=20 readonly /></div>
    <div class="g-col g-col-6"><slider value=20 disabled /></div>
</div>
```

### 最大值和最小值

<div class="m-example"></div>

```xml
<slider value={value} min=10 max=50 />
<p>{value}</p>
```

### 连续和间隔

<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6"><slider /></div>
    <div class="g-col g-col-6"><slider step=20 /></div>
</div>
```

### 事件

<div class="m-example"></div>

```xml
<slider on-change={console.log('on-change', '$event.value', $event.value)} />
```
