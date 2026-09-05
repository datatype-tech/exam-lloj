const s={id:"2024j",year:2024,level:"J",title:"2024 年 CSP-J 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"计算机内部采用二进制表示数据，最主要的原因是（ ）。",options:["物理器件容易实现两种稳定状态","二进制运算速度比十进制快","二进制数书写更简短","二进制便于人类阅读"],answer:0,analysis:"电子器件天然有导通/截止、高/低电平两种稳定状态，用二进制表示最可靠、最易实现。",tags:["计算机常识","编码与存储"],diff:1},{stem:"所谓『64 位计算机』，其中 64 位指的是（ ）。",options:["内存容量为 64 GB","CPU 一次能处理的二进制位数","硬盘为 64 位","CPU 有 64 个核心"],answer:1,analysis:"字长指 CPU 一次能并行处理的二进制位数，64 位即字长 64 位。",tags:["计算机常识"],diff:1},{stem:"十进制数 2024 转换为十六进制数是（ ）。",options:["7E8","8E7","7D8","F68"],answer:0,analysis:"2024 = 7×256 + 14×16 + 8，对应 7、E、8，即 (7E8)₁₆。",tags:["数制转换"],diff:2},{stem:"UTF-8 编码中，一个常用汉字通常占用（ ）个字节。",options:["1","2","3","4"],answer:2,analysis:"UTF-8 是变长编码：ASCII 字符 1 字节，常用汉字 3 字节，生僻字 4 字节。",tags:["编码与存储"],diff:2},{stem:"C++ 中取余运算符 % 的两个操作数必须是（ ）。",options:["任意类型","整数类型","浮点类型","正数"],answer:1,analysis:"% 只适用于整型操作数，对浮点数取余需使用 fmod。",tags:["语言基础"],diff:1},{stem:"用两个栈可以实现的数据结构是（ ）。",options:["栈","队列","堆","二叉树"],answer:1,analysis:"一个栈负责入队、一个负责出队（倒栈），即可用两个栈模拟队列的 FIFO。这是经典的栈应用题。",tags:["栈","队列"],diff:2},{stem:"在已知前驱结点的情况下，从单链表中删除一个结点的时间复杂度为（ ）。",options:["O(1)","O(log n)","O(n)","O(n²)"],answer:0,analysis:"只需修改前驱结点的 next 指针，O(1) 完成；若需先找到前驱则是 O(n)。",tags:["链表","复杂度"],diff:2},{stem:"结点数为 127 的满二叉树，其高度为（ ）。",options:["6","7","8","9"],answer:1,analysis:"满二叉树结点数 = 2ʰ − 1，127 = 2⁷ − 1，故高度 h = 7。",tags:["树与二叉树"],diff:2},{stem:"快速排序在最坏情况下的时间复杂度为（ ）。",options:["O(n)","O(n log n)","O(n²)","O(n³)"],answer:2,analysis:"每次划分都极不平衡（如已有序时总选到最值作基准）时退化为 O(n²)；平均情况才是 O(n log n)。",tags:["排序","复杂度"],diff:2},{stem:"凸八边形的对角线共有（ ）条。",options:["16","18","20","24"],answer:2,analysis:"n 边形对角线数 = n(n−3)/2，8×5/2 = 20。",tags:["组合数学"],diff:2},{stem:"命题 p → q 与其逆否命题 ¬q → ¬p 的真假关系是（ ）。",options:["完全相反","完全相同","没有确定关系","仅当 p 为真时相同"],answer:1,analysis:"原命题与逆否命题等价（同真同假），这是逻辑推理和反证法的基础。",tags:["逻辑运算"],diff:2},{stem:"斐波那契数列满足 f(1)=f(2)=1，则 f(15) 的值为（ ）。",options:["377","610","987","233"],answer:1,analysis:"1,1,2,3,5,8,13,21,34,55,89,144,233,377,**610**。",tags:["递归与分治"],diff:2},{stem:'判断字符串 "level" 是否为回文串，双指针法需要比较的字符对数为（ ）。',options:["2","3","4","5"],answer:0,analysis:"双指针从两端向中间：比较 (l,l)、(e,e) 两对后指针相遇，中间字符 v 无需比较。n 个字符只需比较 ⌊n/2⌋ 对。",tags:["字符串"],diff:2},{stem:"关于树与图的关系，下列说法正确的是（ ）。",options:["树是连通且无环的图","树中可能存在环","有环的图一定是树","树不是图的一种"],answer:0,analysis:"树的图论定义：连通且无环的图；等价地，n 个顶点 n−1 条边的连通图。",tags:["树与二叉树","图论"],diff:1},{stem:"log₂(1024) 的值为（ ）。",options:["8","9","10","11"],answer:2,analysis:"1024 = 2¹⁰，故 log₂1024 = 10。这也是对 1024 个元素二分查找的最多次数。",tags:["复杂度","数制转换"],diff:1}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序，回答问题。输入为一个不含空格的字符串（长度不超过 1000）。",code:`#include <iostream>
#include <string>
using namespace std;

int main() {
    string s, t = "";
    cin >> s;
    int n = s.size();
    for (int i = n - 1; i >= 0; i--) t += s[i];
    bool ok = true;
    for (int i = 0; i < n; i++) {
        if (s[i] != t[i]) {
            ok = false;
            break;
        }
    }
    cout << t << " " << (ok ? "YES" : "NO") << endl;
    return 0;
}`,questions:[{type:"judge",stem:"当输入字符串是回文串时，程序第二项输出为 YES。",answer:0,score:2,analysis:"t 是 s 的逆序串；s 与 t 完全相同 ⇔ s 是回文串。",tags:["程序阅读","字符串"],diff:1},{type:"judge",stem:"若把 t 的构造改为 `for (int i = 0; i < n; i++) t = s[i] + t;`，程序的输出结果不变。",answer:0,score:2,analysis:"每次把新字符拼到 t 的最前面，同样得到逆序串，只是写法不同。",tags:["程序阅读","字符串"],diff:3},{type:"choice",stem:"输入为 `noon` 时，程序的输出是（ ）。",options:["noon YES","noon NO","onon YES","noon"],answer:0,score:3,analysis:'"noon" 的逆序仍是 "noon"，是回文串，输出 noon YES。',tags:["程序阅读","字符串"],diff:1},{type:"choice",stem:"输入为 `abcbaX` 时，程序的输出是（ ）。",options:["Xabcba NO","abcbaX NO","abcbaX YES","Xabcba YES"],answer:0,score:3,analysis:'t 为逆序串 "Xabcba"，与 s 不相等，输出 Xabcba NO。注意先输出的是逆序串 t 而非原串。',tags:["程序阅读","字符串"],diff:2},{type:"choice",stem:"对长度为 n 的字符串，程序中第二个循环最多执行的次数为（ ）。",options:["n","⌊n / 2⌋","2n","log₂n"],answer:0,score:3,analysis:"当字符串是回文串时循环不会提前 break，需要比较全部 n 个位置（最坏情况）。",tags:["程序阅读","复杂度","字符串"],diff:2}]}],completes:[{title:"完善程序（1）",intro:"（区间合并）给定 n 个区间，把所有有重叠或首尾相接的区间合并，下面的程序输出合并后的区间个数。请补全代码。",code:`#include <iostream>
#include <algorithm>
using namespace std;

struct Seg { int l, r; } a[100005];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i].l >> a[i].r;
    sort(a + 1, a + n + 1, [](Seg x, Seg y) { return ① ; });
    int cnt = 0;
    int cl = a[1].l, cr = a[1].r;   // 当前合并中的区间 [cl, cr]
    for (int i = 2; i <= n; i++) {
        if ( ② ) {
            cr = max(cr, ③ );
        } else {
            cnt++;
            cl = a[i].l;
            cr = ④ ;
        }
    }
    cnt++;
    cout << ⑤ << endl;
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["x.l < y.l","x.r < y.r","x.l > y.l","x.r > y.r"],answer:0,analysis:"按左端点从小到大排序，才能从左到右扫描合并。",tags:["算法设计","贪心","排序"],diff:2},{stem:"第 ② 空应填入（ ）。",options:["a[i].l <= cr","a[i].l < cl","a[i].r < cr","a[i].l > cr"],answer:0,analysis:"当前区间左端点不超过合并中的右端点 cr，说明有重叠（或相接），应当合并。",tags:["算法设计","贪心"],diff:3},{stem:"第 ③ 空应填入（ ）。",options:["a[i].r","a[i].l","cr","a[i].l + a[i].r"],answer:0,analysis:"合并后右端点取两者较大值：cr = max(cr, a[i].r)。",tags:["算法设计","贪心"],diff:2},{stem:"第 ④ 空应填入（ ）。",options:["a[i].r","a[i - 1].r","cr","a[i].l"],answer:0,analysis:"不重叠时开启一个新的合并区间 [a[i].l, a[i].r]，故 cr 置为 a[i].r。",tags:["算法设计","贪心"],diff:2},{stem:"第 ⑤ 空应填入（ ）。",options:["cnt","cnt - 1","n","n - cnt"],answer:0,analysis:"cnt 统计了『断开』次数和收尾的一次合并区间，即合并后的区间总数。",tags:["算法设计","贪心"],diff:2}]}]};export{s as default};
