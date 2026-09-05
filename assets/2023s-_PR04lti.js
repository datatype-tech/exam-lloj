const s={id:"2023s",year:2023,level:"S",title:"2023 年 CSP-S 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"提出『存储程序』原理、奠定现代计算机体系结构的科学家是（ ）。",options:["图灵","冯·诺依曼","巴贝奇","艾肯"],answer:1,analysis:"冯·诺依曼在 EDVAC 报告中系统阐述了存储程序原理；图灵提出图灵机模型；巴贝奇设计了差分机与分析机。",tags:["计算机常识"],diff:1},{stem:"下列网络协议中，提供面向连接的可靠传输服务的是（ ）。",options:["TCP","UDP","IP","HTTP"],answer:0,analysis:"TCP 通过三次握手、确认重传等机制保证可靠有序传输；UDP 是不可靠无连接的；HTTP 是应用层协议。",tags:["网络基础","计算机常识"],diff:2},{stem:"关于补码加法运算的溢出，下列说法正确的是（ ）。",options:["两个正数相加结果为负数时发生溢出","只有减法运算才可能溢出","补码运算不会产生溢出","溢出时程序一定会崩溃"],answer:0,analysis:"同号相加结果异号即溢出（正+正得负，或负+负得正）；异号相加不会溢出。C++ 中有符号溢出属于未定义行为，不会自动报错。",tags:["数制转换","编码与存储"],diff:3},{stem:"由 3 对括号组成的不同合法括号序列共有（ ）种。",options:["4","5","6","9"],answer:1,analysis:"合法括号序列数 = 卡特兰数 C₃ = 5：((()))、()(())、(())()、(()())、()()()。",tags:["栈","组合数学"],diff:2},{stem:"在大根堆中删除堆顶元素并重新调整堆，时间复杂度为（ ）。",options:["O(1)","O(log n)","O(n)","O(n log n)"],answer:1,analysis:"删除堆顶后用末尾元素补位并向下调整（下沉），最多调整树高 log n 次。",tags:["堆","复杂度"],diff:2},{stem:"并查集同时使用路径压缩与按秩合并后，单次操作的均摊时间复杂度接近（ ）。",options:["严格的 O(1)","O(log n)","O(α(n))，近似常数","O(n)"],answer:2,analysis:"α(n) 是反阿克曼函数，增长极其缓慢，实际应用中小于 5，可视为近似常数，但理论上不是严格 O(1)。",tags:["图论","复杂度"],diff:4},{stem:"在**无权**图中求单源最短路径，最适合的算法是（ ）。",options:["Dijkstra","BFS","Floyd","SPFA"],answer:1,analysis:"无权图边权全为 1，BFS 按层扩展即得最短路，O(n+m)；Dijkstra 适用于非负权图，杀鸡用牛刀。",tags:["图论","搜索"],diff:2},{stem:"0/1 背包问题的 O(nW) 动态规划算法属于（ ）。",options:["多项式时间算法","伪多项式时间算法","指数时间算法","线性时间算法"],answer:1,analysis:"复杂度中的 W 是数值而非输入规模（输入规模是 W 的位数 log W），因此称为伪多项式时间；背包问题是 NP 难的。",tags:["动态规划","复杂度"],diff:4},{stem:"4 个元素的错位排列（每个元素都不在原来位置上）共有（ ）种。",options:["6","8","9","11"],answer:2,analysis:"错排数 D₄ = 9。递推：Dₙ = (n−1)(Dₙ₋₁ + Dₙ₋₂)，D₁=0，D₂=1，D₃=2，D₄=9。",tags:["组合数学"],diff:3},{stem:"对任意正整数 a、b，gcd(a, b) × lcm(a, b) 等于（ ）。",options:["a + b","a × b","a − b","a ÷ b"],answer:1,analysis:"最大公约数 × 最小公倍数 = 两数之积，这是数论中的基本恒等式。",tags:["数论"],diff:2},{stem:"数组中除一个数只出现一次外，其余数都恰好出现两次。用 O(1) 额外空间找出这个数的方法是（ ）。",options:["对所有数做异或","用数组计数","先排序再扫描","二分查找"],answer:0,analysis:"利用 a^a=0、a^0=a：全部异或后成对的数相互抵消，剩下的就是只出现一次的数。",tags:["位运算"],diff:3},{stem:"蒙提霍尔问题：三扇门后有一辆汽车，你选定一扇后，主持人打开另一扇有山羊的门。此时换门的中奖概率为（ ）。",options:["1/2","1/3","2/3","3/4"],answer:2,analysis:"你最初选中的概率是 1/3，汽车在另外两扇门后的概率是 2/3；主持人排除一扇后，这 2/3 全部集中到剩下那扇门上，故换门中奖概率为 2/3。",tags:["概率"],diff:3},{stem:"一个无向图是二分图，当且仅当（ ）。",options:["图中不存在长度为奇数的环","图中不存在长度为偶数的环","图中所有顶点度数为偶数","图是一棵树"],answer:0,analysis:"二分图判定定理：不含奇环。可以用黑白染色（BFS）验证。",tags:["图论"],diff:3},{stem:'字符串 "aba" 的不同回文子串共有（ ）个。',options:["3","4","5","6"],answer:1,analysis:'单字符 "a"、"b"、"a" 各是回文（不同位置算不同子串），加上 "aba" 本身，共 4 个。',tags:["字符串"],diff:2},{stem:"递归式 T(n) = 4T(n/2) + n 的渐近时间复杂度为（ ）。",options:["O(n)","O(n log n)","O(n²)","O(n³)"],answer:2,analysis:"由主定理：n^(log₂4) = n²，而 f(n) = n 低一个量级，故 T(n) = O(n²)。也可画递归树：第 i 层代价 2ⁱ·n，共 log n 层求和得 O(n²)。",tags:["复杂度","递归与分治"],diff:4}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序，回答问题。程序对每个位置 i，输出它右侧第一个比 a[i] 大的元素的下标（不存在则输出 0）。",code:`#include <iostream>
#include <stack>
using namespace std;

const int MAXN = 100005;
int a[MAXN], ans[MAXN];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];
    stack<int> st;
    for (int i = n; i >= 1; i--) {
        while (!st.empty() && a[st.top()] <= a[i]) st.pop();
        ans[i] = st.empty() ? 0 : st.top();
        st.push(i);
    }
    for (int i = 1; i <= n; i++)
        cout << ans[i] << (i < n ? ' ' : '\\n');
    return 0;
}`,questions:[{type:"judge",stem:"任意时刻，栈中保存的下标对应的数组值从栈底到栈顶单调递减。",answer:0,score:2,analysis:"压入 i 之前会弹出所有值 ≤ a[i] 的元素，剩下的都比 a[i] 大，因此栈底到栈顶值单调递减——这正是『单调栈』。",tags:["程序阅读","栈"],diff:3},{type:"judge",stem:"若数组严格单调递增，则对任意 i < n 都有 ans[i] = i + 1。",answer:0,score:2,analysis:"单调递增时每个元素右侧第一个更大的就是紧邻的下一个元素。",tags:["程序阅读","栈"],diff:2},{type:"choice",stem:"输入为 `5` 和 `1 3 2 4 5` 时，程序的输出是（ ）。",options:["2 4 4 5 0","2 3 4 5 0","3 4 4 5 0","2 4 5 5 0"],answer:0,score:3,analysis:`a[1]=1 右侧第一个更大是 a[2]=3 → 2；a[2]=3 → a[4]=4 → 4；a[3]=2 → a[4] → 4；a[4]=4 → a[5]=5 → 5；a[5] 无 → 0。
输出 2 4 4 5 0。`,tags:["程序阅读","栈"],diff:3},{type:"choice",stem:"输入为 `4` 和 `4 3 2 1` 时，程序的输出是（ ）。",options:["0 0 0 0","1 2 3 4","2 3 4 0","4 3 2 1"],answer:0,score:3,analysis:"数组单调递减，每个元素右侧都没有比它更大的值，全部输出 0。",tags:["程序阅读","栈"],diff:2},{type:"choice",stem:"该算法的时间复杂度为（ ）。",options:["O(n)","O(n log n)","O(n²)","O(log n)"],answer:0,score:3,analysis:"每个元素最多入栈、出栈各一次，总操作次数 O(n)——均摊分析是单调栈的精髓。",tags:["程序阅读","复杂度","栈"],diff:3}]}],completes:[{title:"完善程序（1）",intro:"（大根堆）下面的程序维护一个大根堆：依次插入 n 个数，然后两次弹出堆顶（最大值）并输出。请补全代码。",code:`#include <iostream>
using namespace std;

const int MAXN = 100005;
int h[MAXN], sz;   // h[1..sz] 为堆，h[1] 是堆顶

void push(int x) {
    h[++sz] = x;
    int i = sz;
    while (i > 1 && ① ) {
        swap(h[i], h[i / 2]);
        i = ② ;
    }
}

int pop() {
    int ret = h[1];
    h[1] = h[sz--];
    int i = 1;
    while (true) {
        int j = i;
        if (2 * i <= sz && h[2 * i] > h[j]) j = 2 * i;
        if (2 * i + 1 <= sz && ③ ) j = 2 * i + 1;
        if ( ④ ) break;
        swap(h[i], h[j]);
        i = ⑤ ;
    }
    return ret;
}

int main() {
    int n, x;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> x;
        push(x);
    }
    cout << pop() << " " << pop() << endl;
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["h[i] > h[i / 2]","h[i] < h[i / 2]","h[i] > h[1]","h[i] != h[i / 2]"],answer:0,analysis:"插入后向上调整（上浮）：只要儿子比父亲大就交换，维持大根堆性质。",tags:["算法设计","堆"],diff:2},{stem:"第 ② 空应填入（ ）。",options:["i / 2","i - 1","2 * i","i + 1"],answer:0,analysis:"上浮到父亲结点继续比较：下标 i / 2（整数除法）。",tags:["算法设计","堆"],diff:1},{stem:"第 ③ 空应填入（ ）。",options:["h[2 * i + 1] > h[j]","h[2 * i + 1] < h[j]","h[2 * i + 1] != h[j]","h[2 * i] > h[j]"],answer:0,analysis:"右儿子存在且比当前候选 j 更大时，把候选换成右儿子——j 最终指向较大的孩子。",tags:["算法设计","堆"],diff:3},{stem:"第 ④ 空应填入（ ）。",options:["j == i","j > i","i > sz","2 * i > sz"],answer:0,analysis:"j 仍等于 i 说明没有比它大的孩子，堆性质已满足，下沉结束。",tags:["算法设计","堆"],diff:3},{stem:"第 ⑤ 空应填入（ ）。",options:["j","i + 1","2 * i","sz"],answer:0,analysis:"与较大孩子交换后，继续向下调整：i 移动到孩子位置 j。",tags:["算法设计","堆"],diff:2}]}]};export{s as default};
