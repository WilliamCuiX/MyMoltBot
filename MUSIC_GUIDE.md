# 添加自定义音乐

## 方法一：将音乐文件放到项目中

### 1. 创建 public/music 目录
```bash
mkdir -p /workspaces/MyMoltBot/public/music
```

### 2. 上传音乐文件
把你的 mp3 文件放到 `public/music/` 目录，例如：
```
public/music/
  ├── 周杰伦-青花瓷.mp3
  ├── 周杰伦-七里香.mp3
  └── 周杰伦-晴天.mp3
```

### 3. 更新代码
修改 `src/app/music/page.tsx`，在 `songs` 数组中添加你的歌曲：

```typescript
const [songs] = useState<Song[]>([
  {
    id: 1,
    title: '青花瓷',
    artist: '周杰伦',
    duration: 238,
    cover: '/music/covers/qinghuaci.jpg',  // 或使用网络图片
    url: '/music/周杰伦-青花瓷.mp3',
  },
  // ... 更多歌曲
]);
```

## 方法二：使用网络音频 URL

如果你有音乐文件的网络地址，直接在代码中使用：

```typescript
{
  id: 1,
  title: '七里香',
  artist: '周杰伦',
  duration: 293,
  cover: 'https://example.com/cover.jpg',
  url: 'https://example.com/七里香.mp3',  // 直接使用 URL
}
```

## 注意事项

### 版权问题
- 请确保你有权播放这些音乐
- 个人使用通常没问题，但公开发布需要版权授权

### 文件大小
- 建议每个 mp3 文件不超过 10MB
- GitHub 有文件大小限制（单文件 100MB）

### 获取封面图片
- 可以从网上找专辑封面图片
- 或自己制作封面放到 `public/music/covers/` 目录

## 示例：添加周杰伦歌曲

```typescript
const jayChouSongs: Song[] = [
  {
    id: 100,
    title: '青花瓷',
    artist: '周杰伦',
    duration: 238,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    url: '/music/周杰伦-青花瓷.mp3',
  },
  {
    id: 101,
    title: '七里香',
    artist: '周杰伦',
    duration: 293,
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    url: '/music/周杰伦-七里香.mp3',
  },
  {
    id: 102,
    title: '晴天',
    artist: '周杰伦',
    duration: 269,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    url: '/music/周杰伦-晴天.mp3',
  },
];
```
