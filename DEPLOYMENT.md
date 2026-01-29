# 项目部署说明

## 服务管理

使用 PM2 进行进程管理，确保服务稳定运行。

### PM2 命令

```bash
# 查看服务状态
pm2 status

# 查看日志
pm2 logs mymoltbot

# 重启服务
pm2 restart mymoltbot

# 停止服务
pm2 stop mymoltbot

# 删除服务
pm2 delete mymoltbot

# 监控资源使用
pm2 monit
```

### 为什么服务会自动停止？

GitHub Codespaces 是临时开发环境，有以下限制：
1. **资源限制** - 超过内存或CPU使用会被终止
2. **不活跃超时** - 长时间无操作会自动休眠
3. **后台进程限制** - 普通后台进程可能被系统清理

### 解决方案

使用 PM2 管理进程后：
- ✅ 自动重启：进程崩溃后会自动重启
- ✅ 日志管理：自动记录所有日志
- ✅ 资源监控：可实时查看CPU和内存使用

**注意：** Codespaces 不活跃时仍会休眠，重新打开后服务会自动启动。

## 访问地址

- **移动端/PC端通用：**
  https://psychic-enigma-v6wjjqgq7pcp64w-3000.app.github.dev/music

## 开发提示

每次代码更改后，Next.js 会自动热更新，无需手动重启。
