const s={id:"2025s",year:2025,level:"S",title:"2025 年 CSP-S 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"信息论的奠基人、提出『比特』作为信息度量单位的科学家是（ ）。",options:["香农","图灵","维纳","冯·诺依曼"],answer:0,analysis:"克劳德·香农 1948 年发表《通信的数学理论》，奠定信息论基础。",tags:["计算机常识"],diff:1},{stem:"CPU 高速缓存（Cache）之所以能有效提升性能，利用的基本原理是（ ）。",options:["局部性原理","摩尔定律","香农定理","图灵完备性"],answer:0,analysis:"程序访问具有时间与空间局部性：刚用过的数据和邻近数据很可能马上再用，因此缓存命中率高。",tags:["计算机常识","编码与存储"],diff:2},{stem:"32 位有符号 int 类型能表示的最大值是（ ）。",options:["2147483647","4294967295","1073741823","2147483648"],answer:0,analysis:"2³¹ − 1 = 2147483647；4294967295 是 32 位无符号最大值。记牢这个数，溢出题常考。",tags:["编码与存储","数制转换"],diff:1},{stem:"在表达式树中，叶子结点存放的是（ ）。",options:["操作数","运算符","括号","函数名"],answer:0,analysis:"表达式树中内部结点是运算符，叶子结点是操作数；遍历表达式树可得前缀/中缀/后缀表达式。",tags:["树与二叉树","栈"],diff:2},{stem:"著名的生日悖论指出：一个房间里至少（ ）人时，存在两人生日相同的概率超过 50%。",options:["10","23","50","183"],answer:1,analysis:"只需 23 人，存在同生日的概率就超过 50%——直觉与计算结果的巨大反差也是哈希冲突必然存在的概率解释。",tags:["概率","哈希"],diff:3},{stem:"求解二分图最大匹配的经典算法是（ ）。",options:["匈牙利算法","Kruskal 算法","Dijkstra 算法","拓扑排序"],answer:0,analysis:"匈牙利算法基于增广路思想求二分图最大匹配。",tags:["图论"],diff:3},{stem:"Bellman-Ford 算法可以用来判断图中是否存在（ ）。",options:["正环","负环","欧拉环","哈密顿环"],answer:1,analysis:"n−1 轮松弛后仍能继续松弛，说明存在负环（可以无限缩短路径）。",tags:["图论"],diff:3},{stem:"编辑距离（Levenshtein 距离）问题通常使用（ ）求解。",options:["贪心","动态规划","分治","随机化算法"],answer:1,analysis:"编辑距离是经典二维 DP：f[i][j] 表示两串前缀间的最小编辑操作数。",tags:["动态规划","字符串"],diff:2},{stem:"在 1~100 的整数中，能被 3 或 5 整除的数共有（ ）个。",options:["45","46","47","48"],answer:2,analysis:"容斥原理：⌊100/3⌋ + ⌊100/5⌋ − ⌊100/15⌋ = 33 + 20 − 6 = 47。",tags:["组合数学","数论"],diff:2},{stem:"中国剩余定理（CRT）主要用于求解（ ）。",options:["最大公约数","一元线性同余方程组","最小生成树","实数线性方程组"],answer:1,analysis:"CRT 解决『x 分别模若干两两互质的数余若干值』的同余方程组，在模数不互质时需要扩展 CRT。",tags:["数论"],diff:3},{stem:"整数 2025 的二进制表示中，数字 1 的个数为（ ）。",options:["6","7","8","9"],answer:2,analysis:"2025 = 1024+512+256+128+64+32+8+1，共 8 个加数即 8 个 1。可用 x&(x−1) 技巧逐次消去最低位的 1 来数。",tags:["位运算","数制转换"],diff:2},{stem:"连续抛一枚均匀硬币直到首次出现正面，期望的抛掷次数为（ ）。",options:["1","1.5","2","e"],answer:2,analysis:"几何分布的期望 = 1/p = 1/0.5 = 2 次。",tags:["概率"],diff:2},{stem:"关于有向无环图（DAG）的拓扑排序，下列说法正确的是（ ）。",options:["拓扑序一定是唯一的","拓扑序可能不唯一","任何有向图都存在拓扑序","拓扑排序只能用 DFS 实现"],answer:1,analysis:"同一时刻入度为 0 的顶点可能有多个，选谁都可以，故拓扑序一般不唯一；有环则不存在拓扑序。",tags:["图论"],diff:2},{stem:"用中心扩展法求字符串的最长回文子串，时间复杂度为（ ）。",options:["O(n)","O(n log n)","O(n²)","O(n³)"],answer:2,analysis:"枚举 2n−1 个中心，每个中心最多扩展 n 次，共 O(n²)；Manacher 算法可优化到 O(n)。",tags:["字符串","复杂度"],diff:3},{stem:"二分查找的递归实现中，递归调用占用的栈空间复杂度为（ ）。",options:["O(1)","O(log n)","O(n)","O(n log n)"],answer:1,analysis:"递归深度等于二分次数 log n，故栈空间 O(log n)；改成循环迭代可降到 O(1)。",tags:["复杂度","递归与分治"],diff:2}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序，回答问题。输入第一行为 n（2 ≤ n ≤ 10⁵），接下来 n 行每行一个仅含小写字母的字符串。",code:`#include <iostream>
#include <string>
using namespace std;

const long long BASE = 131;
const long long MOD = 1000000007;

long long strHash(const string& s) {
    long long h = 0;
    for (char c : s) {
        h = (h * BASE + c) % MOD;
    }
    return h;
}

int main() {
    int n;
    cin >> n;
    string prev, cur;
    cin >> prev;
    int same = 0;
    for (int i = 1; i < n; i++) {
        cin >> cur;
        if (strHash(cur) == strHash(prev)) same++;
        prev = cur;
    }
    cout << same << endl;
    return 0;
}`,questions:[{type:"judge",stem:"程序统计的是『相邻两个字符串哈希值相等』的次数。",answer:0,score:2,analysis:"每轮比较 cur 与 prev 的哈希，相等则 same++，随后 prev 更新为 cur，因此只统计相邻对。",tags:["程序阅读","哈希","字符串"],diff:2},{type:"judge",stem:"若两个字符串的哈希值相同，则它们的内容一定相同。",answer:1,score:2,analysis:"错误。哈希函数是多对一映射，不同内容可能映射到同一哈希值（哈希冲突）；只能说内容相同 ⇒ 哈希必相同，反之不成立。",tags:["程序阅读","哈希"],diff:3},{type:"choice",stem:"输入为 `3` 和三个字符串 `a`、`b`、`c` 时，程序的输出是（ ）。",options:["0","1","2","3"],answer:0,score:3,analysis:"三个不同单字符的哈希值互不相同，相邻相等的次数为 0。",tags:["程序阅读","哈希","字符串"],diff:1},{type:"choice",stem:"输入为 `4` 和四个字符串 `ab`、`ab`、`cd`、`ab` 时，程序的输出是（ ）。",options:["1","2","3","0"],answer:0,score:3,analysis:"相邻对为 (ab,ab) 相同、(ab,cd) 不同、(cd,ab) 不同，故 same = 1。注意只统计相邻，不统计所有相等对。",tags:["程序阅读","哈希","字符串"],diff:2},{type:"choice",stem:"设字符串长度为 L，strHash 单次计算的时间复杂度为（ ）。",options:["O(1)","O(L)","O(L²)","O(log L)"],answer:1,score:3,analysis:"逐字符滚动计算哈希，每个字符常数时间，共 O(L)。",tags:["程序阅读","复杂度","哈希"],diff:2}]}],completes:[{title:"完善程序（1）",intro:"（树上最大独立集）给定一棵 n 个结点的树，要求选出最多的结点，使任意两个被选结点都不相邻。下面的程序用树形 DP 求解并输出最大值。请补全代码。",code:`#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 100005;
vector<int> e[MAXN];
int f[MAXN][2];   // f[u][0]：不选 u 时子树最大值；f[u][1]：选 u 时子树最大值

void dfs(int u, int fa) {
    f[u][0] = ① ;
    f[u][1] = ② ;
    for (int v : e[u]) {
        if (v == fa) continue;
        dfs(v, u);
        f[u][0] += ③ ;
        f[u][1] += ④ ;
    }
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i < n; i++) {
        int a, b;
        cin >> a >> b;
        e[a].push_back(b);
        e[b].push_back(a);
    }
    dfs(1, 0);
    cout << ⑤ << endl;
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["0","1","-1","n"],answer:0,analysis:"不选 u 时初始贡献为 0（尚未累加子树）。",tags:["算法设计","动态规划","树与二叉树"],diff:2},{stem:"第 ② 空应填入（ ）。",options:["1","0","2","f[u][0]"],answer:0,analysis:"选 u 时先把 u 自己计入，初始为 1。",tags:["算法设计","动态规划","树与二叉树"],diff:2},{stem:"第 ③ 空应填入（ ）。",options:["max(f[v][0], f[v][1])","f[v][0]","f[v][1]","min(f[v][0], f[v][1])"],answer:0,analysis:"u 不选时，孩子 v 可选可不选，取两者较大值。",tags:["算法设计","动态规划","树与二叉树"],diff:3},{stem:"第 ④ 空应填入（ ）。",options:["f[v][0]","f[v][1]","max(f[v][0], f[v][1])","f[v][1] + 1"],answer:0,analysis:"u 选了，孩子 v 就不能选（相邻约束），只能累加 f[v][0]。",tags:["算法设计","动态规划","树与二叉树"],diff:3},{stem:"第 ⑤ 空应填入（ ）。",options:["max(f[1][0], f[1][1])","f[1][0]","f[1][1]","f[1][0] + f[1][1]"],answer:0,analysis:"根结点选与不选两种情况取最大，即整棵树的最大独立集大小。",tags:["算法设计","动态规划","树与二叉树"],diff:2}]}]};export{s as default};
