const s={id:"2021s",year:2021,level:"S",title:"2021 年 CSP-S 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"全国青少年信息学奥林匹克竞赛（NOI）系列活动的主办单位是（ ）。",options:["中国计算机学会（CCF）","教育部","中国科协","工业和信息化部"],answer:0,analysis:"NOI、NOIP、CSP-J/S 等信息学竞赛与认证均由**中国计算机学会（CCF）**主办。",tags:["计算机常识"],diff:1},{stem:"冯·诺依曼体系结构的核心思想是（ ）。",options:["存储程序","二进制编码","流水线","并行计算"],answer:0,analysis:"冯·诺依曼体系的核心是『存储程序』：程序和数据一样存放在存储器中，按地址顺序执行。",tags:["计算机常识"],diff:1},{stem:"在 C++ 中，表达式 `0.1 + 0.2 == 0.3`（double 类型）的值为（ ）。",options:["true","false","取决于编译器","会产生运行时错误"],answer:1,analysis:"0.1、0.2、0.3 在二进制浮点中都是无限循环小数，存在舍入误差，0.1+0.2 的结果略大于 0.3，故比较为 false。浮点数判等应使用误差范围。",tags:["编码与存储","语言基础"],diff:3},{stem:"5 个不同元素依次进栈，可能得到的出栈序列共有（ ）种。",options:["14","42","120","132"],answer:1,analysis:"合法出栈序列数 = 卡特兰数 C₅ = C(10,5)/6 = 252/6 = 42。",tags:["栈","组合数学"],diff:3},{stem:"一棵有 n 个结点的树，所有结点的度数之和为（ ）。",options:["n - 1","2(n - 1)","2n","n²"],answer:1,analysis:"树有 n−1 条边，每条边贡献 2 个度数，故度数之和 = 2(n−1)。",tags:["树与二叉树","图论"],diff:2},{stem:"KMP 算法中 next[j] 的含义是（ ）。",options:["模式串前 j 个字符中最长的相等真前后缀的长度","模式串第 j 个字符下一次出现的位置","匹配失败时主串指针应回退的位置","模式串第 j 个字符与前缀相同的最长后缀位置"],answer:0,analysis:"next[j] 表示模式串前缀 p[1..j] 的最长相等真前后缀长度，失配时据此滑动模式串，主串指针不回退。",tags:["字符串"],diff:4},{stem:"使用堆优化的 Dijkstra 算法，在 n 个顶点、m 条边的图上时间复杂度为（ ）。",options:["O(n + m)","O((n + m) log n)","O(n² · log n)","O(2ⁿ)"],answer:1,analysis:"每条边最多触发一次堆松弛操作，每次堆操作 O(log n)，总体 O((n+m) log n)。",tags:["图论","复杂度","堆"],diff:3},{stem:"对一个序列进行冒泡排序，其交换元素的总次数等于原序列的（ ）。",options:["比较次数","逆序对数","移动次数","排序趟数"],answer:1,analysis:"冒泡排序每次交换恰消除一个逆序对，故交换次数 = 逆序对总数。",tags:["排序","组合数学"],diff:3},{stem:"组合数 C(10, 3) 的值为（ ）。",options:["60","120","240","720"],answer:1,analysis:"C(10,3) = 10×9×8 / (3×2×1) = 720/6 = 120。",tags:["组合数学"],diff:1},{stem:"关于整数 2021，下列说法正确的是（ ）。",options:["2021 是质数","2021 = 43 × 47","2021 能被 3 整除","2021 是完全平方数"],answer:1,analysis:"2021 = 43 × 47，是合数；各位数字和为 5，不能被 3 整除；45² = 2025 ≠ 2021。",tags:["数论"],diff:2},{stem:"位运算表达式 `x & (x - 1)` 的作用是（ ）。",options:["消去 x 二进制表示中最低位的 1","取出 x 二进制表示中最低位的 1","将 x 的二进制表示全部取反","判断 x 是否为 2 的幂"],answer:0,analysis:"x−1 会把最低位的 1 变为 0、其后的 0 全变 1，相与后最低位的 1 被消去。该技巧可用于统计二进制中 1 的个数（每执行一次少一个 1）。",tags:["位运算"],diff:3},{stem:"掷一枚均匀骰子，所得点数的数学期望为（ ）。",options:["3","3.5","4","4.5"],answer:1,analysis:"E = (1+2+3+4+5+6)/6 = 21/6 = 3.5。",tags:["概率"],diff:1},{stem:"拓扑排序可以应用于（ ）。",options:["任意有向图","有向无环图","无向连通图","完全图"],answer:1,analysis:"拓扑排序的前提是无环：只有有向无环图（DAG）才存在拓扑序。",tags:["图论"],diff:2},{stem:"字符串哈希中，两个不同的字符串得到相同哈希值的现象称为（ ）。",options:["溢出","冲突","回文","匹配"],answer:1,analysis:"不同键映射到同一哈希值即为**哈希冲突**，常用拉链法或开放寻址法处理。",tags:["哈希","字符串"],diff:1},{stem:"归并排序在合并过程中需要的额外空间复杂度为（ ）。",options:["O(1)","O(log n)","O(n)","O(n log n)"],answer:2,analysis:"合并时需要与原数组等长的临时数组，故空间复杂度 O(n)。",tags:["排序","复杂度"],diff:2}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序（欧拉线性筛），回答问题。保证输入 2 ≤ n ≤ 10⁶。",code:`#include <iostream>
using namespace std;

const int MAXN = 1000005;
int primes[MAXN], cnt;
bool notPrime[MAXN];

int main() {
    int n;
    cin >> n;
    for (int i = 2; i <= n; i++) {
        if (!notPrime[i]) primes[cnt++] = i;
        for (int j = 0; j < cnt; j++) {
            int x = i * primes[j];
            if (x > n) break;
            notPrime[x] = true;
            if (i % primes[j] == 0) break;
        }
    }
    cout << cnt << endl;
    return 0;
}`,questions:[{type:"judge",stem:"在欧拉筛中，每个合数恰好被筛去一次。",answer:0,score:2,analysis:"每个合数只会被它的**最小质因子**筛去（`i % primes[j] == 0` 时 break 保证了这一点），这正是欧拉筛 O(n) 的原因。",tags:["程序阅读","数论"],diff:3},{type:"judge",stem:"若删去第 16 行 `if (i % primes[j] == 0) break;`，程序的输出结果仍然正确。",answer:0,score:2,analysis:"删去该句后合数会被重复标记多次，结果仍正确（notPrime 只是被重复置 true），但退化为普通筛法、效率降低。",tags:["程序阅读","数论"],diff:3},{type:"choice",stem:"输入为 `10` 时，程序的输出是（ ）。",options:["3","4","5","6"],answer:1,score:3,analysis:"不超过 10 的质数为 2、3、5、7，共 4 个。",tags:["程序阅读","数论"],diff:1},{type:"choice",stem:"输入为 `30` 时，程序的输出是（ ）。",options:["9","10","11","12"],answer:1,score:3,analysis:"不超过 30 的质数：2, 3, 5, 7, 11, 13, 17, 19, 23, 29，共 10 个。",tags:["程序阅读","数论"],diff:2},{type:"choice",stem:"当 i = 6 且 n ≥ 30 时，内层循环标记的合数是（ ）。",options:["只有 12","12 和 18","12、18、30","12 和 24"],answer:0,score:3,analysis:"i = 6 时 j = 0：x = 6×2 = 12，标记 12；因 6 % 2 == 0 立即 break，循环结束。所以只标记 12。",tags:["程序阅读","数论"],diff:4}]}],completes:[{title:"完善程序（1）",intro:"（最长上升子序列）下面的程序读入 n 个整数，用 O(n²) 的动态规划求最长严格上升子序列的长度并输出。请补全代码。",code:`#include <iostream>
using namespace std;

const int MAXN = 1005;
int a[MAXN], f[MAXN];   // f[i]：以 a[i] 结尾的最长上升子序列长度

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        f[i] = ① ;
        for (int j = 1; j < i; j++) {
            if ( ② )
                f[i] = max(f[i], ③ );
        }
        ans = max(ans, ④ );
    }
    cout << ⑤ << endl;
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["1","0","a[i]","i"],answer:0,analysis:"任何元素自身都构成长度为 1 的上升子序列，故初始化 f[i] = 1。",tags:["算法设计","动态规划"],diff:2},{stem:"第 ② 空应填入（ ）。",options:["a[j] < a[i]","a[j] <= a[i]","a[j] > a[i]","f[j] > f[i]"],answer:0,analysis:"要求严格上升，只有 a[j] < a[i] 时 a[i] 才能接在 a[j] 后面；若取 <= 则求的是『不降』子序列。",tags:["算法设计","动态规划"],diff:3},{stem:"第 ③ 空应填入（ ）。",options:["f[j] + 1","f[j]","f[i - 1] + 1","f[j - 1] + 1"],answer:0,analysis:"状态转移：a[i] 接在以 a[j] 结尾的最优序列之后，长度变为 f[j] + 1。",tags:["算法设计","动态规划"],diff:2},{stem:"第 ④ 空应填入（ ）。",options:["f[i]","f[n]","a[i]","1"],answer:0,analysis:"答案要在所有 f[i] 中取最大，枚举到 i 时就更新 ans = max(ans, f[i])。",tags:["算法设计","动态规划"],diff:2},{stem:"第 ⑤ 空应填入（ ）。",options:["ans","f[n]","n","f[ans]"],answer:0,analysis:"输出全局最大值 ans；注意不能写 f[n]——最长上升子序列不一定以最后一个元素结尾。",tags:["算法设计","动态规划"],diff:2}]}]};export{s as default};
