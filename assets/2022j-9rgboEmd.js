const n={id:"2022j",year:2022,level:"J",title:"2022 年 CSP-J 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"世界上第一台通用电子数字计算机是（ ）。",options:["ENIAC","EDVAC","UNIVAC","IBM PC"],answer:0,analysis:"ENIAC 于 1946 年在美国宾夕法尼亚大学诞生，是第一台通用电子计算机。",tags:["计算机常识"],diff:1},{stem:"下列软件中，不属于操作系统的是（ ）。",options:["Windows 11","Linux","iOS","Photoshop"],answer:3,analysis:"Photoshop 是图像处理应用软件；Windows、Linux、iOS 都是操作系统。",tags:["计算机常识"],diff:1},{stem:"整数 −1 的 8 位二进制补码表示为（ ）。",options:["10000001","11111110","11111111","10000000"],answer:2,analysis:"1 的原码 00000001，反码 11111110，补码 = 反码 + 1 = **11111111**。",tags:["数制转换","编码与存储"],diff:2},{stem:"逻辑运算符的优先级从高到低依次为（ ）。",options:["NOT > AND > OR","AND > NOT > OR","OR > AND > NOT","OR > NOT > AND"],answer:0,analysis:"与数学中的『非、乘、加』对应：非（NOT）最高，或（OR）最低。",tags:["逻辑运算"],diff:1},{stem:"对于顺序存储的队列（循环队列），出队操作的时间复杂度为（ ）。",options:["O(1)","O(log n)","O(n)","O(n²)"],answer:0,analysis:"出队只需移动队头指针，O(1) 完成。",tags:["队列","复杂度"],diff:1},{stem:"某二叉树的前序遍历为 ABDECF，中序遍历为 DBEAFC，则其后序遍历为（ ）。",options:["DEBFCA","DBEFCA","DEBFAC","DFEBCA"],answer:0,analysis:`前序首元素 A 为根；中序中 A 左侧 {D,B,E} 为左子树、右侧 {F,C} 为右子树。
左子树：根 B，左 D 右 E → 后序 DEB；右子树：根 C，左 F → 后序 FC。
合并：DEB + FC + A = **DEBFCA**。`,tags:["树与二叉树"],diff:3},{stem:"当待排序序列已经基本有序时，插入排序的时间复杂度最接近（ ）。",options:["O(1)","O(n)","O(n log n)","O(n²)"],answer:1,analysis:"基本有序时每个元素只需比较很少几次即可插入，总代价接近 O(n)——这是插入排序的优势场景。",tags:["排序","复杂度"],diff:2},{stem:"检查一段文本中的括号是否匹配，最适合使用的数据结构是（ ）。",options:["队列","栈","链表","数组"],answer:1,analysis:"左括号入栈，右括号弹出栈顶匹配，最后栈空则匹配——后进先出正好对应嵌套结构。",tags:["栈"],diff:2},{stem:"哈希表解决冲突的常用方法**不包括**（ ）。",options:["链地址法","开放寻址法","再哈希法","二分查找法"],answer:3,analysis:"二分查找是有序表上的查找方法，与哈希冲突处理无关。",tags:["哈希"],diff:2},{stem:"从 6 名同学中选出 3 人参加比赛，不同的选法共有（ ）种。",options:["15","18","20","120"],answer:2,analysis:"C(6,3) = 20。注意『选出』不计顺序，若排队上场则是 A(6,3) = 120。",tags:["组合数学"],diff:2},{stem:"判断一个非负整数 x 是否为奇数，下列表达式正确的是（ ）。",options:["(x & 1) == 1","(x | 1) == 1","(x ^ 1) == 0","x % 2 == 0"],answer:0,analysis:"x & 1 取出最低位：奇数最低位为 1。",tags:["位运算"],diff:1},{stem:"用邻接矩阵存储 n 个顶点的图，所需空间复杂度为（ ）。",options:["O(n)","O(n + m)","O(n²)","O(m²)"],answer:2,analysis:"邻接矩阵是 n×n 的二维数组，空间 O(n²)；邻接表才是 O(n+m)。",tags:["图论","复杂度"],diff:2},{stem:"递归函数 f(n) = n × f(n−1)，f(0) = 1，则 f(5) 的值为（ ）。",options:["24","60","120","720"],answer:2,analysis:"f(n) 即阶乘 n!，5! = 120。",tags:["递归与分治"],diff:1},{stem:"下列字符串中，属于回文串的是（ ）。",options:["apple","level","hello","world"],answer:1,analysis:"level 正读反读完全相同。",tags:["字符串"],diff:1},{stem:"代码 `for (i=1; i<=n; i++) for (j=i; j<=n; j++) s++;` 的时间复杂度为（ ）。",options:["O(n)","O(n log n)","O(n²)","O(n³)"],answer:2,analysis:"执行次数 = n + (n−1) + … + 1 = n(n+1)/2，渐近为 O(n²)。",tags:["复杂度"],diff:2}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序，回答问题。输入第一行为 n（1 ≤ n ≤ 100），第二行为 n 个互不相同的整数。",code:`#include <iostream>
using namespace std;

int a[105];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];
    int sw = 0;
    for (int i = 1; i <= n - 1; i++) {
        for (int j = 1; j <= n - i; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
                sw++;
            }
        }
    }
    cout << sw << endl;
    for (int i = 1; i <= n; i++)
        cout << a[i] << (i < n ? ' ' : '\\n');
    return 0;
}`,questions:[{type:"judge",stem:"程序输出的 sw 等于原序列的逆序对数量。",answer:0,score:2,analysis:"冒泡排序每次交换恰消除一个逆序对，故交换总次数 = 逆序对数。",tags:["程序阅读","排序"],diff:3},{type:"judge",stem:"若把第 13 行的 `>` 改为 `>=`，对于元素互不相等的输入，sw 的值不变。",answer:0,score:2,analysis:"元素互不相等时不会出现相等的情况，>= 与 > 行为完全一致。但对含重复元素的输入，>= 会多做交换。",tags:["程序阅读","排序"],diff:3},{type:"choice",stem:"输入为 `5` 和 `5 4 3 2 1` 时，程序第一行输出的是（ ）。",options:["4","5","10","15"],answer:2,score:3,analysis:"完全逆序的 5 个元素，逆序对数 = C(5,2) = 10，故 sw = 10。",tags:["程序阅读","排序","组合数学"],diff:3},{type:"choice",stem:"输入为 `4` 和 `1 3 2 4` 时，程序第一行输出的是（ ）。",options:["1","2","3","4"],answer:0,score:3,analysis:"只有 (3,2) 一对逆序，交换一次即有序，sw = 1。",tags:["程序阅读","排序"],diff:2},{type:"choice",stem:"输入为 `4` 和 `2 1 4 3` 时，第一趟外层循环（i = 1）结束后数组变为（ ）。",options:["1 2 3 4","1 2 4 3","2 1 3 4","1 3 2 4"],answer:0,score:3,analysis:"j=1：2>1 交换 → 1 2 4 3；j=2：2<4 不交换；j=3：4>3 交换 → **1 2 3 4**。",tags:["程序阅读","排序"],diff:3}]}],completes:[{title:"完善程序（1）",intro:"（约瑟夫问题）n 个人（编号 1~n）围成一圈，从 1 号开始报数，报到 k 的人出圈，下一个人从 1 重新报数。程序依次输出出圈者编号，最后输出幸存者的编号。请补全代码。",code:`#include <iostream>
using namespace std;

bool out[1005];   // out[i] = true 表示 i 已出圈

int main() {
    int n, k;
    cin >> n >> k;
    int cnt = 0;    // 已出圈人数
    int cur = 0;    // 当前所在位置
    int num = 0;    // 当前报数
    while ( ① ) {
        cur = ② ;
        if (!out[cur]) {
            num++;
            if ( ③ ) {
                out[cur] = true;
                cout << cur << " ";
                cnt++;
                num = ④ ;
            }
        }
    }
    for (int i = 1; i <= n; i++)
        if ( ⑤ ) cout << i << endl;
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["cnt < n","cnt < n - 1","cnt <= n","cnt > 0"],answer:1,analysis:"当只剩最后一人（已出圈 n−1 人）时循环结束，剩下的即幸存者。",tags:["算法设计","模拟"],diff:2},{stem:"第 ② 空应填入（ ）。",options:["cur + 1","cur % n + 1","(cur + 1) % n","cur % n"],answer:1,analysis:"编号是 1~n 的环形推进：cur % n + 1 可在 1~n 之间循环；(cur+1) % n 会得到 0~n−1，与编号体系不符。",tags:["算法设计","模拟"],diff:3},{stem:"第 ③ 空应填入（ ）。",options:["num == k","num > k","num == n","cnt == k"],answer:0,analysis:"报到 k 的人出圈，故条件为 num == k。",tags:["算法设计","模拟"],diff:1},{stem:"第 ④ 空应填入（ ）。",options:["0","1","k","cur"],answer:0,analysis:"有人出圈后，下一个人从 1 重新报数，所以 num 清零。",tags:["算法设计","模拟"],diff:2},{stem:"第 ⑤ 空应填入（ ）。",options:["!out[i]","out[i]","i == cur","out[i] == 1"],answer:0,analysis:"幸存者就是唯一没有出圈（out[i] 为 false）的人。",tags:["算法设计","模拟"],diff:2}]}]};export{n as default};
