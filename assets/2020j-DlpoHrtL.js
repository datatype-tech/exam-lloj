const s={id:"2020j",year:2020,level:"J",title:"2020 年 CSP-J 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"在计算机的内存储器中，数据进行编址的基本单位是（ ）。",options:["位（bit）","字节（Byte）","字（Word）","双字（DWord）"],answer:1,analysis:`内存按**字节**编址，每个字节有唯一地址；位是最小信息单位但不是编址单位。
1 字节 = 8 位，这是常识题的送分点。`,tags:["计算机常识","编码与存储"],diff:1},{stem:"下列编程语言中，属于编译型语言的是（ ）。",options:["Python","JavaScript","C++","BASIC"],answer:2,analysis:`C++ 源代码先经编译器整体翻译为机器码再执行，是典型编译型语言。
Python、JavaScript、BASIC 通常由解释器逐行执行。`,tags:["计算机常识","语言基础"],diff:1},{stem:"中国的国家顶级域名是（ ）。",options:[".com",".cn",".net",".org"],answer:1,analysis:".cn 是中国的国家代码顶级域名（ccTLD）；.com/.net/.org 是通用顶级域名。",tags:["计算机常识","网络基础"],diff:1},{stem:"二进制数 (1011.011)₂ 转换为十进制数是（ ）。",options:["11.375","11.625","11.75","12.375"],answer:0,analysis:`整数部分 1011₂ = 8+2+1 = 11；小数部分 0.011₂ = 0×0.5 + 1×0.25 + 1×0.125 = **0.375**。
合计 11.375。`,tags:["数制转换"],diff:2},{stem:"逻辑表达式 !(A || B) 等价于（ ）。",options:["!A && !B","!A || !B","!(A && B)","A && B"],answer:0,analysis:`德摩根律：否定『或』等于分别否定后取『与』，即 !(A∨B) = ¬A ∧ ¬B。
可以列真值表逐行验证。`,tags:["逻辑运算"],diff:2},{stem:"对数组 {49, 38, 65, 97, 76, 13, 27} 以第一个元素 49 为基准进行一趟快速排序划分，划分后的数组为（ ）。",options:["{27, 38, 13, 49, 76, 97, 65}","{13, 27, 38, 49, 65, 76, 97}","{27, 13, 38, 49, 76, 97, 65}","{38, 27, 13, 49, 65, 76, 97}"],answer:0,analysis:`标准划分过程：右指针找小于 49 的 27 填到左端；左指针找到 65 填到右端；右指针找到 13 填过去；左指针找到 97 填过去；两指针相遇后放入基准 49。
结果 {27, 38, 13, **49**, 76, 97, 65}——基准归位，左侧均小于它，右侧均大于它。`,tags:["排序"],diff:3},{stem:"元素 a、b、c、d 依次进栈，下列不可能的出栈序列是（ ）。",options:["c b a d","d c b a","d a b c","a b c d"],answer:2,analysis:`若第一个出栈的是 d，说明 a、b、c、d 已全部入栈，此时栈内从栈顶到栈底为 c、b、a，出栈顺序只能是 c→b→a。
所以 d 之后必为 c b a，『d a b c』不可能出现。`,tags:["栈"],diff:3},{stem:"6 个字符的频率分别为 5、9、12、13、16、45，构造哈夫曼编码后的带权路径长度 WPL 为（ ）。",options:["224","220","240","216"],answer:0,analysis:`每次合并最小的两个：5+9=14，12+13=25，14+16=30，25+30=55，45+55=100。
WPL = 各次合并值之和 = 14+25+30+55+100 = **224**。`,tags:["树与二叉树","贪心"],diff:3},{stem:"把 5 本不同的书分给 3 个人，每人至少分到 1 本，不同的分法共有（ ）种。",options:["120","150","90","240"],answer:1,analysis:`容斥：总分配 3⁵=243；减去某人没书的情况 C(3,1)·2⁵=96；加回两人没书 C(3,2)·1⁵=3。
243 − 96 + 3 = **150**。`,tags:["组合数学"],diff:4},{stem:"用辗转相除法求 gcd(91, 52)，需要的取余运算次数为（ ）。",options:["2","3","4","5"],answer:1,analysis:`91 = 52×1 + **39**；52 = 39×1 + **13**；39 = 13×3 + **0**。
共做了 3 次取余，gcd = 13。`,tags:["数论"],diff:2},{stem:"一棵有 1000 个结点的完全二叉树，其叶子结点个数为（ ）。",options:["499","500","501","512"],answer:1,analysis:`完全二叉树中叶子数 = n − ⌊n/2⌋（编号 ⌊n/2⌋+1 到 n 的结点都是叶子）。
1000 − 500 = **500**。`,tags:["树与二叉树"],diff:3},{stem:"6 个顶点的连通无向图，至少有（ ）条边。",options:["4","5","6","7"],answer:1,analysis:"n 个顶点连通至少需要 n−1 条边（此时是一棵树）。6 − 1 = **5**。",tags:["图论"],diff:2},{stem:"代码 `for (i=1; i<=n; i*=2) for (j=1; j<=n; j++) s++;` 的时间复杂度为（ ）。",options:["O(n)","O(n log n)","O(n²)","O(log n)"],answer:1,analysis:"外层循环变量每次乘 2，执行 ⌈log₂n⌉ 次；内层固定 n 次。合计 O(n log n)。",tags:["复杂度"],diff:2},{stem:"已知 f(1)=f(2)=1，f(n)=f(n−1)+f(n−2)，则 f(10) 的值为（ ）。",options:["34","55","89","144"],answer:1,analysis:`斐波那契数列：1, 1, 2, 3, 5, 8, 13, 21, 34, **55**。
背熟前 15 项，考场上直接查表。`,tags:["递归与分治"],diff:2},{stem:"C++ 中定义 `int a[10];`，若 a[0] 的地址为 1000，一个 int 占 4 字节，则 a[6] 的地址为（ ）。",options:["1020","1024","1028","1032"],answer:1,analysis:"a[i] 的地址 = 首地址 + i × 元素大小 = 1000 + 6×4 = **1024**。",tags:["语言基础","编码与存储"],diff:2}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序，回答问题。假设输入的字符串长度不超过 100。",code:`#include <iostream>
#include <cstring>
using namespace std;

int main() {
    char s[105];
    cin >> s;
    int cnt[26] = {0};
    int n = strlen(s);
    for (int i = 0; i < n; i++) {
        if (s[i] >= 'A' && s[i] <= 'Z')
            s[i] = s[i] - 'A' + 'a';
        cnt[s[i] - 'a']++;
    }
    int best = 0;
    for (int i = 1; i < 26; i++)
        if (cnt[i] > cnt[best]) best = i;
    cout << (char)('a' + best) << " " << cnt[best] << endl;
    return 0;
}`,questions:[{type:"judge",stem:"输入中含有大写字母时，程序会把它当作对应的小写字母一起统计。",answer:0,score:2,analysis:"第 10–11 行把大写字母统一转为小写（s[i] − 'A' + 'a'），再计入 cnt，因此大小写不敏感。",tags:["程序阅读","字符串"],diff:2},{type:"judge",stem:"若输入字符串中包含数字字符，程序仍能保证输出正确结果。",answer:1,score:2,analysis:"数字字符如 '0'：s[i] − 'a' = −49，数组下标越界，属于**未定义行为**，可能崩溃或污染其他数据。",tags:["程序阅读","字符串","语言基础"],diff:3},{type:"choice",stem:"输入为 `Abaa` 时，程序的输出是（ ）。",options:["a 3","b 1","a 4","b 3"],answer:0,score:3,analysis:'统一转小写后为 "abaa"：a 出现 3 次、b 出现 1 次。\nbest 扫描取最大计数，输出 `a 3`。',tags:["程序阅读","字符串"],diff:2},{type:"choice",stem:"若把第 15 行的 `>` 改为 `>=`，输入为 `ab` 时，程序的输出变为（ ）。",options:["a 1","b 1","a 2","程序运行出错"],answer:1,score:3,analysis:"改为 >= 后，计数相等时后出现的字母会覆盖 best。a、b 各 1 次，b 在后，故输出 `b 1`。",tags:["程序阅读","语言基础"],diff:3},{type:"choice",stem:"输入为 `abracadabra` 时，程序输出的次数（第二个数）是（ ）。",options:["3","4","5","6"],answer:2,score:3,analysis:"逐字符统计：a 出现 5 次（位置 1,4,6,8,11），b、r 各 2 次，c、d 各 1 次。\n最多的是 a，输出 `a 5`。",tags:["程序阅读","字符串"],diff:3}]}],completes:[{title:"完善程序（1）",intro:"（埃氏筛法）下面的程序读入 n（2 ≤ n ≤ 10⁶），输出不超过 n 的所有质数，质数之间用空格分隔，行末输出换行。请补全代码。",code:`#include <iostream>
using namespace std;

const int MAXN = 1000005;
bool isComp[MAXN];   // isComp[x] = true 表示 x 是合数
int primes[MAXN], cnt;

int main() {
    int n;
    cin >> n;
    for (int i = 2; i <= n; i++) {
        if ( ① ) {
            primes[cnt++] = i;
            for (int j = 2 * i; j <= n; ② )
                ③ ;
        }
    }
    for (int i = 0; i < cnt; i++)
        cout << primes[i] << (i + 1 < cnt ? ④ : ⑤ );
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["!isComp[i]","isComp[i]","i % 2 == 0","primes[i] == 0"],answer:0,analysis:"isComp 初始全为 false；i 没被任何更小的质数筛掉 ⇒ i 是质数，应进入质数表，故条件为 !isComp[i]。",tags:["算法设计","数论"],diff:2},{stem:"第 ② 空应填入（ ）。",options:["j++","j += i","j *= 2","j += 2"],answer:1,analysis:"要筛掉的是 i 的倍数：2i, 3i, 4i…，所以 j 每次增加 i。",tags:["算法设计","数论"],diff:2},{stem:"第 ③ 空应填入（ ）。",options:["isComp[j] = true","isComp[i] = true","primes[j] = 0","cnt++"],answer:0,analysis:"j 是质数 i 的倍数 ⇒ j 是合数，标记 isComp[j] = true。",tags:["算法设计","数论"],diff:1},{stem:"第 ④ 空应填入（ ）。",options:['" "','"\\n"','","','";"'],answer:0,analysis:"题意要求质数之间用空格分隔：不是最后一个质数时输出空格。",tags:["算法设计","语言基础"],diff:2},{stem:"第 ⑤ 空应填入（ ）。",options:['"\\n"','" "','","','"."'],answer:0,analysis:'最后一个质数之后按题意输出换行，即 "\\n"。',tags:["算法设计","语言基础"],diff:2}]}]};export{s as default};
