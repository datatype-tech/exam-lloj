const s={id:"2020s",year:2020,level:"S",title:"2020 年 CSP-S 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"提出『图灵机』计算模型、被誉为计算机科学之父的学者是（ ）。",options:["图灵","冯·诺依曼","高纳德","香农"],answer:0,analysis:"艾伦·图灵 1936 年提出图灵机；冯·诺依曼提出存储程序体系结构；香农是信息论之父；高纳德（Knuth）著有《计算机程序设计艺术》。",tags:["计算机常识"],diff:1},{stem:"IEEE 754 标准中，单精度浮点数（float）占用的二进制位数为（ ）。",options:["16","32","64","128"],answer:1,analysis:"float 共 32 位：1 位符号 + 8 位阶码 + 23 位尾数；double 为 64 位。",tags:["编码与存储","计算机常识"],diff:2},{stem:"8 位二进制补码能够表示的整数范围是（ ）。",options:["-127 ~ 127","-128 ~ 127","-128 ~ 128","-255 ~ 255"],answer:1,analysis:"n 位补码范围为 −2ⁿ⁻¹ ~ 2ⁿ⁻¹−1，8 位即 −128 ~ 127；10000000 表示 −128，负数比正数多一个。",tags:["数制转换","编码与存储"],diff:2},{stem:"中缀表达式 a*(b+c)−d 对应的后缀表达式是（ ）。",options:["abc+*d-","abcd+*-","abc+d*-","ab+c*d-"],answer:0,analysis:"括号先算 b+c → bc+；再乘 a → abc+*；最后减 d → **abc+*d-**。",tags:["栈","语言基础"],diff:3},{stem:"下列排序算法中，属于稳定排序的是（ ）。",options:["快速排序","堆排序","归并排序","选择排序"],answer:2,analysis:`归并排序合并时相等元素保持原顺序，稳定；快排、堆排、选择排序不稳定。
口诀：『冒泡、插入、归并、基数』稳定。`,tags:["排序"],diff:2},{stem:"C++ STL 中 std::map 的底层实现通常是（ ）。",options:["哈希表","B 树","红黑树","跳表"],answer:2,analysis:"std::map/set 基于红黑树，保证有序、操作 O(log n)；unordered_map 才是哈希表。",tags:["STL","树与二叉树"],diff:2},{stem:"关于 Dijkstra 算法，下列说法正确的是（ ）。",options:["可以正确处理含负权边的图","不能正确处理含负权边的图","只能用于无向图","时间复杂度为 O(n³)"],answer:1,analysis:"Dijkstra 贪心假定顶点出队即最短路确定，负权边会破坏该前提；负权图应用 Bellman-Ford / SPFA。",tags:["图论","贪心"],diff:3},{stem:"5 个元素的排列中，逆序对数量的最大值是（ ）。",options:["8","9","10","12"],answer:2,analysis:"完全逆序时最多，为 C(5,2) = 10。",tags:["组合数学","排序"],diff:2},{stem:"把 10 个完全相同的球放进 3 个不同的盒子，允许空盒，共有（ ）种放法。",options:["36","66","72","120"],answer:1,analysis:"隔板法：x₁+x₂+x₃=10 的非负整数解 = C(12,2) = 66。",tags:["组合数学"],diff:3},{stem:"同时掷两枚均匀骰子，点数之和为 7 的概率是（ ）。",options:["1/12","1/6","1/9","5/36"],answer:1,analysis:"和为 7 共 6 种组合，总样本 36，概率 6/36 = 1/6。",tags:["概率"],diff:2},{stem:"5 个顶点的无向完全图 K₅ 的边数是（ ）。",options:["8","9","10","15"],answer:2,analysis:"完全图边数 n(n−1)/2 = 10。",tags:["图论"],diff:1},{stem:"由 4 个不同结点能构造出的不同形态的二叉树共有（ ）种。",options:["12","14","16","20"],answer:1,analysis:"二叉树形态数 = 卡特兰数 C(2n,n)/(n+1)，n=4 时为 70/5 = 14。",tags:["树与二叉树","组合数学"],diff:3},{stem:"关于前缀码，下列说法正确的是（ ）。",options:["任何一个字符的编码都不是另一个字符编码的前缀","所有字符的编码长度必须相同","编码中不能出现连续的 0","前缀码的平均码长一定优于等长码"],answer:0,analysis:"前缀码的定义：任何编码互不为前缀，保证可即时唯一解码；哈夫曼编码是最优前缀码。",tags:["树与二叉树","编码与存储"],diff:2},{stem:"3 个不同元素依次进栈，可能得到的出栈序列共有（ ）种。",options:["4","5","6","7"],answer:1,analysis:"合法出栈序列数 = 卡特兰数 C₃ = 5（abc, acb, bac, bca, cba；cab 不可能）。",tags:["栈","组合数学"],diff:2},{stem:"若递归式 T(n) = 2T(n/2) + n，T(1) = 1，则 T(n) 的渐近复杂度为（ ）。",options:["O(n)","O(n log n)","O(n²)","O(n log² n)"],answer:1,analysis:"归并排序递归式：每层代价 n，共 log n 层 ⇒ O(n log n)。",tags:["复杂度","递归与分治"],diff:3}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序，回答问题。保证输入的 a、b、p 均为不超过 10⁹ 的正整数。",code:`#include <iostream>
using namespace std;

long long qpow(long long a, long long b, long long mod) {
    long long res = 1;
    a %= mod;
    while (b > 0) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

int main() {
    long long a, b, p;
    cin >> a >> b >> p;
    cout << qpow(a, b, p) << endl;
    return 0;
}`,questions:[{type:"judge",stem:"第 6 行的 `a %= mod` 不会影响最终结果的正确性。",answer:0,score:2,analysis:"由模运算性质，(a mod m) 的幂与原 a 的幂在模 m 意义下同余，先取模不影响结果，还能防溢出。",tags:["程序阅读","数论"],diff:2},{type:"judge",stem:"while 循环的执行次数与 b 的二进制位数有关，量级为 O(log b)。",answer:0,score:2,analysis:"每轮 b >>= 1 使 b 减半，循环次数等于 b 的二进制位数，即 O(log b)。这就是『快速幂』名字的由来。",tags:["程序阅读","复杂度","位运算"],diff:2},{type:"choice",stem:"输入为 `2 10 1000` 时，程序的输出是（ ）。",options:["24","1024","20","4"],answer:0,score:3,analysis:"2¹⁰ = 1024，1024 mod 1000 = 24。",tags:["程序阅读","数论"],diff:2},{type:"choice",stem:"输入为 `3 5 7` 时，程序的输出是（ ）。",options:["3","5","6","2"],answer:1,score:3,analysis:"3⁵ = 243，243 = 34×7 + 5，故输出 5。",tags:["程序阅读","数论"],diff:2},{type:"choice",stem:"输入为 `2 13 100` 时，整个执行过程中 `res` 被更新的次数是（ ）。",options:["2","3","4","5"],answer:1,score:3,analysis:`b = 13 = (1101)₂，二进制中有 3 个 1，故 res 更新 3 次（res: 1→2→32→92）。
res 更新次数等于 b 的二进制中 1 的个数。`,tags:["程序阅读","位运算"],diff:4}]}],completes:[{title:"完善程序（1）",intro:"（归并排序求逆序对）下面的程序读入 n 个整数，用归并排序统计逆序对数量并输出。请补全代码。",code:`#include <iostream>
using namespace std;

const int MAXN = 500005;
int a[MAXN], tmp[MAXN];
long long inv;

void mergeSort(int l, int r) {
    if (l >= r) return;
    int mid = (l + r) / 2;
    mergeSort(l, mid);
    mergeSort(mid + 1, r);
    int i = l, j = mid + 1, k = l;
    while (i <= mid && j <= r) {
        if ( ① ) {
            tmp[k++] = a[i++];
        } else {
            inv += ② ;
            tmp[k++] = a[j++];
        }
    }
    while (i <= mid) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    for (int p = l; p <= r; p++) ③ ;
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];
    inv = 0;
    mergeSort( ④ , ⑤ );
    cout << inv << endl;
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["a[i] <= a[j]","a[i] < a[j]","a[i] >= a[j]","a[i] > a[j]"],answer:0,analysis:"必须取 <=：若用 <，相等元素会落入 else 分支被错误地计为逆序对。",tags:["算法设计","排序"],diff:3},{stem:"第 ② 空应填入（ ）。",options:["mid - i + 1","mid - i","r - j + 1","j - i"],answer:0,analysis:"当 a[i] > a[j] 时，左半区间中 a[i..mid] 共 mid−i+1 个元素都与 a[j] 构成逆序对。",tags:["算法设计","排序"],diff:4},{stem:"第 ③ 空应填入（ ）。",options:["a[p] = tmp[p]","tmp[p] = a[p]","a[p] = 0","swap(a[p], tmp[p])"],answer:0,analysis:"合并完成后要把临时数组的内容写回原数组 a。",tags:["算法设计","排序"],diff:2},{stem:"第 ④ 空应填入（ ）。",options:["0","1","l","-1"],answer:1,analysis:"数组下标从 1 开始存储（读入循环 i = 1..n），故排序左端点为 1。",tags:["算法设计","语言基础"],diff:2},{stem:"第 ⑤ 空应填入（ ）。",options:["n - 1","n","n + 1","cnt"],answer:1,analysis:"排序区间为 [1, n]，右端点为 n。",tags:["算法设计","语言基础"],diff:2}]}]};export{s as default};
