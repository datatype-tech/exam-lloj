const s={id:"2022s",year:2022,level:"S",title:"2022 年 CSP-S 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"下列部件中，不属于 CPU 组成部分的是（ ）。",options:["运算器","控制器","寄存器","主存储器"],answer:3,analysis:"CPU 由运算器、控制器和寄存器组构成；主存储器（内存）在 CPU 之外，通过总线相连。",tags:["计算机常识"],diff:2},{stem:"现代操作系统中，CPU 调度和分派的基本单位通常是（ ）。",options:["进程","线程","程序","作业"],answer:1,analysis:"线程是 CPU 调度的最小单位；进程是资源分配的最小单位。",tags:["计算机常识"],diff:2},{stem:"8 位补码 10000000 表示的十进制数是（ ）。",options:["-0","-127","-128","128"],answer:2,analysis:"10000000 是 8 位补码的特殊值 −128（没有对应的原码）。补码范围 −128~127，负数比正数多一个。",tags:["数制转换","编码与存储"],diff:3},{stem:"后缀表达式 `5 1 2 + 4 * + 3 -` 的值为（ ）。",options:["10","12","14","16"],answer:2,analysis:"用栈求值：1 2 + → 3；3 4 * → 12；5 12 + → 17；17 3 − → **14**。",tags:["栈"],diff:3},{stem:"平衡二叉树（AVL 树）中，任意结点的左右子树高度差不超过（ ）。",options:["0","1","2","3"],answer:1,analysis:"AVL 树的平衡因子定义为 |左高 − 右高| ≤ 1，从而保证树高 O(log n)。",tags:["树与二叉树"],diff:2},{stem:"Kruskal 算法在合并连通分量时，通常借助的数据结构是（ ）。",options:["栈","队列","并查集","哈希表"],answer:2,analysis:"Kruskal 需要快速判断两个顶点是否已连通、并合并集合——这正是并查集的职责。",tags:["图论","贪心"],diff:2},{stem:"Floyd 算法求图中所有点对之间最短路的时间复杂度为（ ）。",options:["O(n²)","O(n³)","O(nm)","O(n log n)"],answer:1,analysis:"Floyd 是三重循环的动态规划，复杂度 O(n³)。",tags:["图论","复杂度","动态规划"],diff:2},{stem:"下列算法中，运用了贪心策略的是（ ）。",options:["哈夫曼编码","Floyd 最短路","二分查找","归并排序"],answer:0,analysis:"哈夫曼编码每步合并频率最小的两棵树，是典型贪心；Floyd 是动态规划；二分与归并是分治。",tags:["贪心","树与二叉树"],diff:2},{stem:"方程 x₁ + x₂ + x₃ + x₄ = 10 的正整数解共有（ ）组。",options:["84","120","220","286"],answer:0,analysis:"正整数解用隔板法：C(10−1, 4−1) = C(9,3) = 84。（若允许非负则是 C(13,3) = 286，注意区分。）",tags:["组合数学"],diff:3},{stem:"欧拉函数 φ(10) 的值为（ ）。",options:["2","4","5","8"],answer:1,analysis:"φ(10) = 10 × (1−1/2) × (1−1/5) = 4，即 1、3、7、9 四个数与 10 互质。",tags:["数论"],diff:3},{stem:"对非负整数 x，位运算 `x >> 1` 等价于（ ）。",options:["x × 2","⌊x / 2⌋","x % 2","x ⊕ 2"],answer:1,analysis:"右移一位相当于除以 2 并向下取整；左移一位相当于乘 2（不溢出时）。",tags:["位运算"],diff:1},{stem:"从一副 52 张的扑克牌中随机抽出 2 张，两张都是红桃的概率为（ ）。",options:["1/16","1/17","1/26","1/8"],answer:1,analysis:"C(13,2) / C(52,2) = 78 / 1326 = 1/17。",tags:["概率","组合数学"],diff:3},{stem:"无向图存在欧拉回路的充要条件是（ ）。",options:["图连通且所有顶点的度数均为偶数","图连通且恰有两个奇度顶点","图中不存在环","图是完全图"],answer:0,analysis:"欧拉回路（一笔画回到起点）⇔ 连通 + 所有顶点度数为偶；恰有两个奇度顶点对应欧拉路径（不回到起点）。",tags:["图论"],diff:3},{stem:"KMP 字符串匹配算法在最坏情况下的时间复杂度为（ ）。",options:["O(nm)","O(n log m)","O(n + m)","O(n²)"],answer:2,analysis:"KMP 通过 next 数组使主串指针永不回退，总代价 O(n+m)，优于暴力匹配的 O(nm)。",tags:["字符串","复杂度"],diff:3},{stem:"递归式 T(n) = T(n/2) + 1 的渐近时间复杂度为（ ）。",options:["O(1)","O(log n)","O(n)","O(n log n)"],answer:1,analysis:"每次问题规模减半、只做常数工作（如二分查找），共 log n 层 ⇒ O(log n)。",tags:["复杂度","递归与分治"],diff:2}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序（差分与前缀和），回答问题。输入第一行为 n、m（1 ≤ n, m ≤ 10⁵），第二行为 n 个整数 a[1..n]，接下来 m 行每行三个整数 l、r、x，表示将 a[l..r] 都加上 x。",code:`#include <iostream>
using namespace std;

const int MAXN = 100005;
long long d[MAXN], a[MAXN];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++) cin >> a[i];
    for (int i = 1; i <= n; i++) d[i] = a[i] - a[i - 1];
    while (m--) {
        int l, r, x;
        cin >> l >> r >> x;
        d[l] += x;
        d[r + 1] -= x;
    }
    long long cur = 0, mx = 0;
    for (int i = 1; i <= n; i++) {
        cur += d[i];
        if (cur > mx) mx = cur;
    }
    cout << mx << endl;
    return 0;
}`,questions:[{type:"judge",stem:"所有操作完成后，差分数组 d 的前 i 项之和等于此时 a[i] 的值。",answer:0,score:2,analysis:"差分与前缀和互为逆运算：d 是 a 的差分，则 a 是 d 的前缀和；区间加 [l,r] 只需 d[l]+=x、d[r+1]−=x。",tags:["程序阅读","前缀和"],diff:3},{type:"judge",stem:"若 m = 0（没有任何修改操作），程序输出原数组中的最大值。",answer:0,score:2,analysis:"没有操作时 cur 依次还原出 a[i]，mx 记录最大值。注意：若数组全为负数，程序会错误地输出 0（mx 初值为 0）。",tags:["程序阅读","前缀和"],diff:3},{type:"choice",stem:"输入 n=5、m=1，a = `1 2 3 4 5`，操作为 `2 4 10` 时，程序的输出是（ ）。",options:["14","13","15","24"],answer:0,score:3,analysis:"a[2..4] 各加 10 后数组为 1, 12, 13, 14, 5，最大值 14。",tags:["程序阅读","前缀和"],diff:2},{type:"choice",stem:"输入 n=3、m=2，a = `0 0 0`，操作依次为 `1 3 5` 和 `2 3 -5` 时，程序的输出是（ ）。",options:["0","5","10","15"],answer:1,score:3,analysis:"第一次操作后 5,5,5；第二次给 a[2..3] 减 5 后得 5,0,0，最大值 5。",tags:["程序阅读","前缀和"],diff:3},{type:"choice",stem:"该程序处理每一次区间加法操作的时间复杂度是（ ）。",options:["O(1)","O(n)","O(log n)","O(m)"],answer:0,score:3,analysis:"差分技巧的核心优势：每次区间修改只动两个端点，O(1) 完成；最后一次前缀和还原即可。总复杂度 O(n+m)。",tags:["程序阅读","复杂度","前缀和"],diff:3}]}],completes:[{title:"完善程序（1）",intro:"（Kruskal 最小生成树）下面的程序读入 n 个顶点、m 条边的带权无向图，用 Kruskal 算法求最小生成树的边权之和并输出。请补全代码。",code:`#include <iostream>
#include <algorithm>
using namespace std;

const int MAXM = 200005;
struct Edge { int u, v, w; } e[MAXM];
int fa[10005];

int find(int x) {
    return fa[x] == x ? x : fa[x] = find(fa[x]);
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= m; i++)
        cin >> e[i].u >> e[i].v >> e[i].w;
    sort(e + 1, e + m + 1, [](Edge a, Edge b) { return ① ; });
    for (int i = 1; i <= n; i++) ② ;
    long long ans = 0;
    int cnt = 0;
    for (int i = 1; i <= m; i++) {
        int x = find(e[i].u), y = find(e[i].v);
        if ( ③ ) {
            ans += ④ ;
            ⑤ ;
            if (++cnt == n - 1) break;
        }
    }
    cout << ans << endl;
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["a.w < b.w","a.w > b.w","a.u < b.u","a.v < b.v"],answer:0,analysis:"Kruskal 按边权**从小到大**排序，贪心选取最短的可用边。",tags:["算法设计","图论","贪心"],diff:2},{stem:"第 ② 空应填入（ ）。",options:["fa[i] = i","fa[i] = 0","fa[i] = i + 1","find(i)"],answer:0,analysis:"并查集初始化：每个顶点自成一个集合，父亲指向自己。",tags:["算法设计","图论"],diff:1},{stem:"第 ③ 空应填入（ ）。",options:["x != y","x == y","e[i].w > 0","cnt < n"],answer:0,analysis:"只有两端点不在同一集合（加入不会成环）时才能选这条边。",tags:["算法设计","图论"],diff:2},{stem:"第 ④ 空应填入（ ）。",options:["e[i].w","e[i].u + e[i].v","1","find(e[i].w)"],answer:0,analysis:"选中该边后，把它的边权累加进生成树总权值。",tags:["算法设计","图论"],diff:1},{stem:"第 ⑤ 空应填入（ ）。",options:["fa[x] = y","fa[e[i].u] = e[i].v","fa[x] = x","x = y"],answer:0,analysis:"合并两个集合：把 x 所在集合挂到 y 下（必须操作**根** x、y；直接改 fa[e[i].u] 会把集合拆散）。",tags:["算法设计","图论"],diff:3}]}]};export{s as default};
