const s={id:"2023j",year:2023,level:"J",title:"2023 年 CSP-J 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"CSP-J/S 中 CSP 的全称是（ ）。",options:["Certified Software Professional（软件能力认证）","Computer Science Program","Certified System Programmer","Computer Software Project"],answer:0,analysis:"CSP = Certified Software Professional，即 CCF 非专业级软件能力认证，J 为入门级、S 为提高级。",tags:["计算机常识"],diff:1},{stem:"首位获得图灵奖的华人科学家是（ ）。",options:["姚期智","钱学森","杨振宁","高锟"],answer:0,analysis:"姚期智于 2000 年获得图灵奖，是迄今唯一获此殊荣的华人学者。",tags:["计算机常识"],diff:1},{stem:"二进制数 10110110 转换为八进制数是（ ）。",options:["255","266","262","166"],answer:1,analysis:"三位一组：10 110 110 → 2 6 6，即 (266)₈。",tags:["数制转换"],diff:2},{stem:"C++ 中执行 `char c = 'a'; c = c + 3;` 后，变量 c 中存储的字符是（ ）。",options:["c","d","e","100"],answer:1,analysis:"'a' 的 ASCII 为 97，加 3 得 100，对应字符 'd'。",tags:["编码与存储","语言基础"],diff:1},{stem:"C++ 中定义 `int a[5] = {1, 2, 3};`，则 a[4] 的值为（ ）。",options:["3","0","随机值","编译错误"],answer:1,analysis:"部分初始化时，未显式赋值的元素会被自动初始化为 0。",tags:["语言基础"],diff:2},{stem:"后缀表达式 `2 3 + 4 *` 的值为（ ）。",options:["14","20","24","9"],answer:1,analysis:"2 3 + → 5；5 4 * → 20。对应中缀 (2+3)×4。",tags:["栈"],diff:2},{stem:"对图进行广度优先搜索（BFS）时，通常借助的数据结构是（ ）。",options:["栈","队列","堆","链表"],answer:1,analysis:"BFS 按层次推进，先访问的先扩展，使用队列（FIFO）；DFS 才用栈。",tags:["队列","图论","搜索"],diff:2},{stem:"二叉树的第 k 层（根结点为第 1 层）最多含有的结点数为（ ）。",options:["2ᵏ⁻¹","2ᵏ","2k","k²"],answer:0,analysis:"第 1 层 1 个、第 2 层 2 个、第 3 层 4 个……第 k 层最多 2ᵏ⁻¹ 个结点。",tags:["树与二叉树"],diff:2},{stem:"下列关于选择排序的说法中，正确的是（ ）。",options:["它是稳定排序","它是不稳定排序","平均时间复杂度 O(n log n)","最好情况时间复杂度 O(n)"],answer:1,analysis:"选择排序每趟把最小元素交换到前面，可能跨越相等元素，故**不稳定**；其任何情况下时间复杂度都是 O(n²)。",tags:["排序"],diff:2},{stem:"圆周上有 8 个不同的点，任取 3 个点可组成的不同三角形个数为（ ）。",options:["24","48","56","64"],answer:2,analysis:"圆周上任意三点不共线，C(8,3) = 56。",tags:["组合数学"],diff:2},{stem:"逻辑命题『若 p 且 q 为真，则 p 为真』是（ ）。",options:["恒真命题","恒假命题","真假取决于 p","真假取决于 q"],answer:0,analysis:"p ∧ q 为真要求两者皆真，自然能推出 p 为真——这是永真的（重言式）。",tags:["逻辑运算"],diff:2},{stem:"1 MB 等于（ ）。",options:["1000 KB","1024 KB","1000 B","1024 B"],answer:1,analysis:"计算机存储按 1024 进制换算：1 MB = 1024 KB = 1024×1024 B。",tags:["编码与存储","计算机常识"],diff:1},{stem:"爬楼梯每次可以跨 1 级或 2 级，登上 10 级楼梯的不同走法共有（ ）种。",options:["55","89","144","233"],answer:1,analysis:"f(n)=f(n−1)+f(n−2)，f(1)=1，f(2)=2，数列为 1,2,3,5,8,13,21,34,55,**89**。",tags:["递归与分治","动态规划"],diff:2},{stem:'C 风格字符串中，函数调用 `strlen("abc\\0def")` 的返回值为（ ）。',options:["3","6","7","8"],answer:0,analysis:`strlen 遇到第一个 '\\0' 即停止计数，"abc" 之后就是字符串结束符，故返回 3。`,tags:["字符串","语言基础"],diff:3},{stem:"理想情况下（无冲突），哈希表查找一个元素的期望时间复杂度为（ ）。",options:["O(1)","O(log n)","O(n)","O(n log n)"],answer:0,analysis:"哈希表通过散列函数直接定位，理想情况 O(1)；这是它相对平衡树 O(log n) 的优势。",tags:["哈希","复杂度"],diff:2}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序，回答问题。输入第一行为 n、k（1 ≤ k < n ≤ 1000），第二行为 n 个整数。",code:`#include <iostream>
using namespace std;

int a[1005];

void reverseRange(int l, int r) {
    while (l < r) {
        int t = a[l];
        a[l] = a[r];
        a[r] = t;
        l++;
        r--;
    }
}

int main() {
    int n, k;
    cin >> n >> k;
    for (int i = 1; i <= n; i++) cin >> a[i];
    k %= n;
    reverseRange(1, k);
    reverseRange(k + 1, n);
    reverseRange(1, n);
    for (int i = 1; i <= n; i++)
        cout << a[i] << (i < n ? ' ' : '\\n');
    return 0;
}`,questions:[{type:"judge",stem:"该程序实现的功能是将数组循环左移 k 个位置。",answer:0,score:2,analysis:"『三次翻转法』：先翻转前 k 个，再翻转后 n−k 个，最后整体翻转，效果即循环左移 k 位。",tags:["程序阅读","语言基础"],diff:3},{type:"judge",stem:"若 k 是 n 的倍数，程序的输出与原数组相同。",answer:0,score:2,analysis:"k %= n 后 k 变为 0，reverseRange(1, 0) 不执行，后两次翻转互相抵消，数组不变。",tags:["程序阅读"],diff:2},{type:"choice",stem:"输入为 `5 2` 和 `1 2 3 4 5` 时，程序的输出是（ ）。",options:["3 4 5 1 2","4 5 1 2 3","5 4 3 2 1","2 3 4 5 1"],answer:0,score:3,analysis:"翻转前 2 个 → 2 1 3 4 5；翻转后 3 个 → 2 1 5 4 3；整体翻转 → **3 4 5 1 2**。",tags:["程序阅读"],diff:3},{type:"choice",stem:"对同样的输入，第一次调用 reverseRange(1, 2) 结束后数组为（ ）。",options:["2 1 3 4 5","3 2 1 4 5","5 4 3 1 2","1 2 3 4 5"],answer:0,score:3,analysis:"仅交换 a[1] 与 a[2]，数组变为 2 1 3 4 5。",tags:["程序阅读"],diff:2},{type:"choice",stem:"调用 reverseRange 处理长度为 len 的区间时，交换元素的次数为（ ）。",options:["len","⌊len / 2⌋","len - 1","2 × len"],answer:1,score:3,analysis:"双指针从两端向中间靠拢，每轮交换一对，共 ⌊len/2⌋ 次；len 为奇数时中间元素不动。",tags:["程序阅读","复杂度"],diff:2}]}],completes:[{title:"完善程序（1）",intro:"（0/1 背包）有 n 件物品和一个容量为 W 的背包，第 i 件物品重 w[i]、价值 v[i]，每件物品只能选或不选。下面的程序输出能装入背包的最大总价值。请补全代码。",code:`#include <iostream>
#include <cstring>
using namespace std;

const int MAXN = 1005;
int w[MAXN], v[MAXN];
int f[10005];   // f[j]：容量为 j 的背包能装下的最大价值

int main() {
    int n, W;
    cin >> n >> W;
    for (int i = 1; i <= n; i++) cin >> w[i] >> v[i];
    memset(f, ① , sizeof(f));
    for (int i = 1; i <= n; i++) {
        for (int j = ② ; j >= ③ ; j--) {
            f[j] = max(f[j], ④ );
        }
    }
    cout << ⑤ << endl;
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["0","1","-1","0x3f"],answer:0,analysis:"初始时不装任何物品价值为 0，f 数组全部清零。",tags:["算法设计","动态规划"],diff:1},{stem:"第 ② 空应填入（ ）。",options:["W","n","w[i]","10000"],answer:0,analysis:"容量从最大值 W 开始**逆序**枚举。",tags:["算法设计","动态规划"],diff:2},{stem:"第 ③ 空应填入（ ）。",options:["0","1","w[i]","w[i] - 1"],answer:2,analysis:"容量 j 必须 ≥ w[i] 才装得下第 i 件；同时**逆序**枚举保证了每件物品只被使用一次（正序就会变成完全背包）。",tags:["算法设计","动态规划"],diff:4},{stem:"第 ④ 空应填入（ ）。",options:["f[j - w[i]] + v[i]","f[j - v[i]] + w[i]","f[j] + v[i]","f[j - 1] + v[i]"],answer:0,analysis:"状态转移：装入第 i 件 ⇒ 用剩余容量 j−w[i] 的最优值加上 v[i]，与不装取 max。",tags:["算法设计","动态规划"],diff:3},{stem:"第 ⑤ 空应填入（ ）。",options:["f[W]","f[n]","f[W - 1]","ans"],answer:0,analysis:"容量不超过 W 的最大价值即 f[W]（该写法下 f[j] 表示容量 ≤ j 的最优解）。",tags:["算法设计","动态规划"],diff:2}]}]};export{s as default};
