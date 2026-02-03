# 护士年终考核系统 (Nurse Exam System) - 架构设计

## 1. 业务目标
构建一个高性能、高可靠性的护士考核平台，支持年终大规模模拟考试与日常练习。
- **题目结构**：100题固定总量（80单选 + 20多选）。
- **分值**：1分/题，总分100分。
- **核心模式**：
  - **练习模式**：即时反馈，强化记忆。
  - **考试模式**：限时交卷，统一评分，防止切屏。

## 2. 技术栈 (Tech Stack)
- **Frontend**: Next.js 14/15 (App Router), Tailwind CSS, Shadcn/UI, Lucide Icons.
- **Backend**: Next.js Server Actions & API Routes.
- **Database**: PostgreSQL (推荐使用 Neon 或 Supabase).
- **ORM**: Prisma (类型安全且易于迁移).
- **Auth**: NextAuth.js (支持工号登录).
- **State Management**: Zustand (管理考试实时答题状态).
- **Validation**: Zod (后端数据校验).

## 3. 数据库设计 (Database Design)
主要表结构如下：
- `User`: 用户信息（工号、科室、权限）。
- `Question`: 题库（区分 SINGLE/MULTIPLE 类型，JSON 存储选项）。
- `Exam`: 试卷实例（记录抽题列表）。
- `ExamRecord`: 成绩单（得分、用时、答案详情）。

## 4. 核心逻辑实现方案
### 4.1 自动抽题算法 (80+20)
采用 PostgreSQL 的 `RANDOM()` 函数，结合题型过滤。系统将首先在 Server 端通过 Prisma 发起两次查询，合并结果后通过 Fisher-Yates 算法进行随机排序（打乱单多选顺序）。

### 4.2 评分机制
- **单选题**：完全匹配得 1 分。
- **多选题**：所有选项必须完全一致（无漏选、无错选）得 1 分。

### 4.3 状态保存与容灾
- 前端：Zustand + LocalStorage 每 30 秒自动暂存答案。
- 后端：支持断线重连，用户再次进入考试时自动恢复至上次记录。

## 5. 项目结构
```text
/app
  /exam         # 考试执行页面
  /dashboard    # 个人成绩与练习历史
  /admin        # 题库管理后台
/components
  /exam         # 答题卡、倒计时、题目组件
/lib
  /actions      # Server Actions (提交答案、生成考试)
/prisma
  - schema.prisma # 数据库模型
```
