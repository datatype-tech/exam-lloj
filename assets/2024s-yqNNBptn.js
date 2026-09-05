const s={id:"2024s",year:2024,level:"S",title:"2024 年 CSP-S 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"世界上第一台通用电子计算机 ENIAC 诞生于（ ）年。",options:["1936","1946","1956","1969"],answer:1,analysis:"ENIAC 于 1946 年诞生于美国宾夕法尼亚大学。",tags:["计算机常识"],diff:1},{stem:"IPv6 地址的二进制位数为（ ）。",options:["32","64","128","256"],answer:2,analysis:"IPv4 地址 32 位，IPv6 扩展到 128 位，彻底解决地址枯竭问题。",tags:["网络基础","计算机常识"],diff:1},{stem:"C++ 中 double 类型在大多数平台上占用的字节数为（ ）。",options:["4","8","10","16"],answer:1,analysis:"double 为 64 位双精度浮点，占 8 字节；float 为 4 字节。",tags:["编码与存储","语言基础"],diff:1},{stem:"元素 1、2、3、4 依次进栈，下列出栈序列中合法的是（ ）。",options:["3 1 2 4","2 4 3 1","4 1 3 2","1 4 2 3"],answer:1,analysis:`逐项验证 B：push 1,2 → pop 2；push 3,4 → pop 4 → pop 3 → pop 1，得到 2 4 3 1 ✓。
A：先出 3 时栈内为 1,2（2 在栈顶），下一个必须出 2 而不是 1，非法；C：先出 4 后必须按 3,2,1 出；D：出 1,4 后栈顶是 3，不能先出 2。`,tags:["栈"],diff:3},{stem:"跳表（Skip List）查找一个元素的期望时间复杂度为（ ）。",options:["O(1)","O(log n)","O(n)","O(n log n)"],answer:1,analysis:"跳表通过随机化多级索引加速链表查找，期望复杂度 O(log n)，工程上常替代平衡树。",tags:["链表","复杂度"],diff:3},{stem:"Tarjan 算法在图论中主要用于求解有向图的（ ）。",options:["最小生成树","强连通分量","单源最短路径","欧拉回路"],answer:1,analysis:"Tarjan 基于 DFS 的 dfn/low 数组求强连通分量；Kruskal/Prim 求最小生成树。",tags:["图论","搜索"],diff:3},{stem:"SPFA 算法在最坏情况下的时间复杂度为（ ）。",options:["O(n + m)","O(n log n)","O(nm)","O(n³)"],answer:2,analysis:"SPFA 是 Bellman-Ford 的队列优化，均摊较快但最坏可达 O(nm)，这也是比赛中它可能被『卡』的原因。",tags:["图论","复杂度"],diff:3},{stem:"活动选择问题（给定若干活动的起止时间，最多能安排多少个互不冲突的活动）应采用的策略是（ ）。",options:["贪心","分治","回溯","网络流"],answer:0,analysis:"按结束时间最早优先选择，是经典的贪心模型。",tags:["贪心"],diff:2},{stem:"卡特兰数 C₆ 的值为（ ）。",options:["42","132","429","120"],answer:1,analysis:"卡特兰数列：1, 1, 2, 5, 14, 42, **132**, 429…（下标从 0 起），C₆ = C(12,6)/7 = 924/7 = 132。",tags:["组合数学","栈"],diff:2},{stem:"费马小定理的内容是：p 为质数且 a 不被 p 整除，则（ ）。",options:["a^(p−1) ≡ 1 (mod p)","a^p ≡ 1 (mod p)","a^(p−1) ≡ a (mod p)","a^(p+1) ≡ 1 (mod p)"],answer:0,analysis:"费马小定理：a^(p−1) ≡ 1 (mod p)，常用于快速幂取模与求模逆元 a^(p−2)。",tags:["数论"],diff:3},{stem:"lowbit(x)（x 二进制最低位的 1 所代表的数值）等于（ ）。",options:["x & (x − 1)","x & (−x)","x | (−x)","x ^ (−x)"],answer:1,analysis:"补码性质使 x & (−x) 恰好只保留最低位的 1；x & (x−1) 则是**消去**这个 1。树状数组的核心操作。",tags:["位运算"],diff:3},{stem:"连续抛 3 次均匀硬币，正面朝上次数的数学期望为（ ）。",options:["1","1.5","2","3"],answer:1,analysis:"每次正面概率 1/2，由期望线性性：3 × 0.5 = 1.5。",tags:["概率"],diff:1},{stem:"哈密顿回路问题（经过每个顶点恰好一次并回到起点）属于（ ）。",options:["P 类问题","NP 完全问题","伪多项式可解问题","线性时间可解问题"],answer:1,analysis:"哈密顿回路是经典的 NP 完全问题，目前无已知多项式算法；注意区分欧拉回路（有充要条件，可快速判定）。",tags:["图论","复杂度"],diff:3},{stem:"暴力字符串匹配（主串长 n、模式串长 m）在最坏情况下的时间复杂度为（ ）。",options:["O(n + m)","O(nm)","O(n log m)","O(m²)"],answer:1,analysis:"每个起始位置都可能比较 m 次，最坏 O(nm)（如主串全 a、模式串 aa…ab）；KMP 可优化到 O(n+m)。",tags:["字符串","复杂度"],diff:2},{stem:"借助归并排序统计逆序对，时间复杂度为（ ）。",options:["O(n)","O(n log n)","O(n²)","O(n² log n)"],answer:1,analysis:"归并的每一层都在合并时统计跨越两边的逆序对，总复杂度与归并排序相同，O(n log n)。",tags:["排序","复杂度","递归与分治"],diff:3}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序（滑动窗口最大值），回答问题。输入第一行为 n、k（1 ≤ k ≤ n ≤ 10⁶），第二行为 n 个整数。程序依次输出每个长度为 k 的滑动窗口中的最大值。",code:`#include <iostream>
#include <deque>
using namespace std;

const int MAXN = 1000005;
int a[MAXN];

int main() {
    int n, k;
    cin >> n >> k;
    for (int i = 1; i <= n; i++) cin >> a[i];
    deque<int> q;   // 存下标，对应值单调递减
    for (int i = 1; i <= n; i++) {
        while (!q.empty() && q.front() < i - k + 1) q.pop_front();
        while (!q.empty() && a[q.back()] <= a[i]) q.pop_back();
        q.push_back(i);
        if (i >= k) cout << a[q.front()] << (i < n ? ' ' : '\\n');
    }
    return 0;
}`,questions:[{type:"judge",stem:"任意时刻，队列中保存的下标对应的数组值从队首到队尾单调递减。",answer:0,score:2,analysis:"入队前从队尾弹出所有值 ≤ a[i] 的元素，保证队列内值单调递减，队首即当前窗口最大值。",tags:["程序阅读","队列"],diff:3},{type:"judge",stem:"程序输出的第一个数等于 a[1..k] 中的最大值。",answer:0,score:2,analysis:"i = k 时首次输出，此时队列维护的正是窗口 [1, k] 的最大值。",tags:["程序阅读","队列"],diff:2},{type:"choice",stem:"输入为 `5 3` 和 `1 3 2 5 4` 时，程序的输出是（ ）。",options:["3 5 5","3 3 5","1 3 5","3 5 4"],answer:0,score:3,analysis:"窗口 [1,3,2] → 3；[3,2,5] → 5；[2,5,4] → 5，输出 3 5 5。",tags:["程序阅读","队列"],diff:2},{type:"choice",stem:"输入为 `4 2` 和 `4 3 2 1` 时，程序的输出是（ ）。",options:["4 3 2","4 4 3","3 2 1","4 3 2 1"],answer:0,score:3,analysis:"窗口 [4,3] → 4；[3,2] → 3；[2,1] → 2，共输出 3 个数：4 3 2。",tags:["程序阅读","队列"],diff:2},{type:"choice",stem:"该算法处理整个数组的时间复杂度为（ ）。",options:["O(n)","O(nk)","O(n log k)","O(k log n)"],answer:0,score:3,analysis:"每个元素最多入队、出队各一次，均摊 O(n)，远优于对每个窗口暴力扫描的 O(nk)。",tags:["程序阅读","复杂度","队列"],diff:3}]}],completes:[{title:"完善程序（1）",intro:"（k 倍区间）给定 n 个整数和一个整数 k，统计有多少个连续子区间 [l, r] 满足区间元素之和是 k 的倍数。下面的程序用前缀和 + 取模计数求解并输出答案。请补全代码。",code:`#include <iostream>
using namespace std;

const int MAXN = 100005;
long long cnt[105];   // cnt[r]：前缀和对 k 取模结果为 r 的个数

int main() {
    int n, k;
    cin >> n >> k;
    long long sum = 0, ans = 0;
    cnt[0] = ① ;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        sum = ② ;
        if (sum < 0) sum += k;   // 保证余数非负
        ans += ③ ;
        ④ ;
    }
    cout << ⑤ << endl;
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["1","0","-1","k"],answer:0,analysis:"空前缀（一个数都不选）的和为 0，要先计入 1 个，否则漏掉『从第一个元素开始就整除』的区间。",tags:["算法设计","前缀和"],diff:3},{stem:"第 ② 空应填入（ ）。",options:["(sum + x) % k","(sum + x) / k","sum + x","(sum + x) % n"],answer:0,analysis:"维护前缀和对 k 的模：区间 [l,r] 和能被 k 整除 ⇔ 前缀和 S[r] 与 S[l−1] 模 k 同余。",tags:["算法设计","前缀和","数论"],diff:3},{stem:"第 ③ 空应填入（ ）。",options:["cnt[sum]","cnt[0]","cnt[x]","cnt[k]"],answer:0,analysis:"之前出现过 cnt[sum] 个同余的前缀，每个都能与当前位置组成一个合法区间。",tags:["算法设计","前缀和"],diff:3},{stem:"第 ④ 空应填入（ ）。",options:["cnt[sum]++","cnt[x]++","sum++","ans++"],answer:0,analysis:"把当前前缀和的余数登记进桶，供后续位置配对。",tags:["算法设计","前缀和"],diff:2},{stem:"第 ⑤ 空应填入（ ）。",options:["ans","cnt[k]","sum","cnt[0]"],answer:0,analysis:"ans 累加了所有合法区间的数量，直接输出。",tags:["算法设计","前缀和"],diff:1}]}]};export{s as default};
