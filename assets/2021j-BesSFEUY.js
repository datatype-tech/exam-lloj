const s={id:"2021j",year:2021,level:"J",title:"2021 年 CSP-J 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"世界上最早广泛使用的高级程序设计语言是（ ）。",options:["Fortran","C","BASIC","Python"],answer:0,analysis:"Fortran 于 1957 年问世，是最早被广泛使用的高级语言；C 语言 1972 年诞生。",tags:["计算机常识"],diff:1},{stem:"断电后其中存储的数据会丢失的存储器是（ ）。",options:["ROM","RAM","硬盘","光盘"],answer:1,analysis:"RAM（随机存取存储器）是易失性存储器，断电数据丢失；ROM、硬盘、光盘都是非易失的。",tags:["计算机常识","编码与存储"],diff:1},{stem:"ASCII 码中，字符 'a' 与 'A' 的码值之差为（ ）。",options:["16","32","26","1"],answer:1,analysis:"'A' = 65，'a' = 97，相差 32。顺手记住 '0' = 48。",tags:["编码与存储"],diff:1},{stem:"十六进制数 2F 转换为十进制数是（ ）。",options:["45","46","47","48"],answer:2,analysis:"2F₁₆ = 2×16 + 15 = 47。",tags:["数制转换"],diff:1},{stem:"C++ 中定义 `int a[5];`，合法的数组下标范围是（ ）。",options:["1 ~ 5","0 ~ 5","0 ~ 4","1 ~ 4"],answer:2,analysis:"C++ 数组下标从 0 开始，长度为 5 的数组合法下标是 0~4；a[5] 越界。",tags:["语言基础"],diff:1},{stem:"元素依次进入一个普通队列，则出队序列与入队序列的关系是（ ）。",options:["完全相同","完全相反","没有确定关系","倒序交替"],answer:0,analysis:"队列是先进先出（FIFO）结构，出队序列必然等于入队序列——这也是队列与栈的本质区别。",tags:["队列"],diff:2},{stem:"一棵有 n 个结点的树，其边数为（ ）。",options:["n","n - 1","n + 1","2n"],answer:1,analysis:"树的定义性质：n 个结点的树恰有 n−1 条边（连通且无环）。",tags:["树与二叉树","图论"],diff:1},{stem:"在 1000 个已排序的元素中进行二分查找，最多需要比较的次数为（ ）。",options:["9","10","11","1000"],answer:1,analysis:"每次比较范围减半，次数为 ⌈log₂1000⌉ = 10（2¹⁰ = 1024 ≥ 1000）。",tags:["递归与分治","复杂度"],diff:2},{stem:"汉诺塔问题中，移动 10 个盘子所需的最少移动次数为（ ）。",options:["511","1023","1024","2047"],answer:1,analysis:"n 层汉诺塔最少移动 2ⁿ − 1 次，2¹⁰ − 1 = 1023。",tags:["递归与分治"],diff:2},{stem:"4 个人排成一排，其中甲、乙两人必须相邻，不同的排法共有（ ）种。",options:["6","12","18","24"],answer:1,analysis:"捆绑法：甲乙视为一个整体与其余 2 人排列有 3! = 6 种，甲乙内部有 2 种顺序，共 2×6 = 12。",tags:["组合数学"],diff:3},{stem:"C++ STL 中，vector 在尾部插入元素的均摊时间复杂度为（ ）。",options:["O(1)","O(log n)","O(n)","O(n²)"],answer:0,analysis:"vector 尾部插入均摊 O(1)（扩容翻倍摊还）；在中间插入需要移动元素，为 O(n)。",tags:["STL","复杂度"],diff:2},{stem:"对 n 个元素进行冒泡排序，最多需要的趟数为（ ）。",options:["n","n - 1","n + 1","n²"],answer:1,analysis:"每趟冒泡至少确定一个元素的位置，n 个元素最多 n−1 趟。",tags:["排序"],diff:2},{stem:"逻辑变量 A、B 满足 A = B 时，A XOR B 的值为（ ）。",options:["0","1","A","B"],answer:0,analysis:"异或『相同为 0，不同为 1』，A = B 时结果为 0。",tags:["逻辑运算","位运算"],diff:1},{stem:"一幅 1024×768 的 24 位真彩色位图（不压缩），占用的存储空间约为（ ）。",options:["0.75 MB","1.5 MB","2.25 MB","4.5 MB"],answer:2,analysis:"1024×768 像素 × 24 位/像素 ÷ 8 = 2359296 字节 ≈ 2.25 MB。公式：分辨率 × 位深 ÷ 8。",tags:["编码与存储"],diff:3},{stem:'字符串 "abcabc" 中，子串 "ab" 出现的次数为（ ）。',options:["1","2","3","4"],answer:1,analysis:"在位置 0 和位置 3 各出现一次，共 2 次。",tags:["字符串"],diff:1}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序，回答问题。保证输入 n ≥ 0，2 ≤ k ≤ 16。",code:`#include <iostream>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    int st[105], top = 0;
    if (n == 0) st[top++] = 0;
    while (n > 0) {
        st[top++] = n % k;
        n /= k;
    }
    for (int i = top - 1; i >= 0; i--) {
        if (st[i] < 10) cout << st[i];
        else cout << (char)('A' + st[i] - 10);
    }
    cout << endl;
    return 0;
}`,questions:[{type:"judge",stem:"该程序利用了栈『先进后出』的思想完成进制转换。",answer:0,score:2,analysis:"余数按『低位到高位』的顺序压入数组，再逆序输出，正是栈的先进后出。",tags:["程序阅读","栈","数制转换"],diff:2},{type:"judge",stem:"当输入为 `0 2` 时，程序输出 0。",answer:0,score:2,analysis:"n == 0 时特判压入一个 0，跳过 while，输出 0。去掉这个特判，0 会什么都不输出。",tags:["程序阅读","数制转换"],diff:2},{type:"choice",stem:"输入为 `255 16` 时，程序的输出是（ ）。",options:["FF","15 15","EF","FE"],answer:0,score:3,analysis:"255 = 15×16 + 15，两个余数都是 15，大于 9 映射为字母 F，输出 FF。",tags:["程序阅读","数制转换"],diff:2},{type:"choice",stem:"输入为 `100 2` 时，程序的输出是（ ）。",options:["1100100","1100010","1110010","1010100"],answer:0,score:3,analysis:"100 = 64 + 32 + 4 = 2⁶+2⁵+2²，即二进制 1100100。",tags:["程序阅读","数制转换"],diff:3},{type:"choice",stem:"输入为 `10 3` 时，while 循环中依次压入 st 数组的数字是（ ）。",options:["1, 0, 1","1, 0","0, 1, 1","1, 1, 0"],answer:0,score:3,analysis:"10%3=1（n→3），3%3=0（n→1），1%3=1（n→0），依次压入 1、0、1；逆序输出 101，即 10 = (101)₃。",tags:["程序阅读","数制转换"],diff:3}]}],completes:[{title:"完善程序（1）",intro:"（高精度加法）下面的程序读入两个非负整数（最多 500 位），输出它们的和。请补全代码。",code:`#include <iostream>
#include <string>
using namespace std;

const int MAXN = 1005;
int a[MAXN], b[MAXN], c[MAXN];

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    int la = s1.size(), lb = s2.size();
    // 倒序存储：a[0] 存个位
    for (int i = 0; i < la; i++) a[i] = s1[la - 1 - i] - '0';
    for (int i = 0; i < lb; i++) b[i] = s2[lb - 1 - i] - '0';
    int len = max(la, lb);
    for (int i = 0; i < len; i++) {
        c[i] += ① ;
        c[i + 1] = ② ;
        c[i] = ③ ;
    }
    if ( ④ ) len++;
    for (int i = ⑤ ; i >= 0; i--) cout << c[i];
    cout << endl;
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["a[i] + b[i]","a[i] * b[i]","c[i] + a[i]","s1[i] + s2[i]"],answer:0,analysis:"对应位相加：当前位累加两个加数的同一位数字（用 += 是因为可能有来自低位的进位）。",tags:["算法设计","语言基础"],diff:2},{stem:"第 ② 空应填入（ ）。",options:["c[i] % 10","c[i] / 10","c[i] * 10","c[i + 1] + 1"],answer:1,analysis:"向高位的进位是当前位之和整除 10。",tags:["算法设计"],diff:2},{stem:"第 ③ 空应填入（ ）。",options:["c[i] % 10","c[i] / 10","c[i] - 1","c[i]"],answer:0,analysis:"当前位只保留个位：对 10 取余。",tags:["算法设计"],diff:1},{stem:"第 ④ 空应填入（ ）。",options:["c[len] > 0","c[len - 1] > 0","len > la","c[0] > 0"],answer:0,analysis:"最高位相加后若仍产生进位（存放在 c[len]），结果需要多出一位。",tags:["算法设计"],diff:3},{stem:"第 ⑤ 空应填入（ ）。",options:["len","len - 1","la - 1","lb - 1"],answer:1,analysis:"输出从最高位 c[len-1] 开始逆序打印到个位。",tags:["算法设计","语言基础"],diff:2}]}]};export{s as default};
