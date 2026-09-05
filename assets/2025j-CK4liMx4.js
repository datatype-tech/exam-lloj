const n={id:"2025j",year:2025,level:"J",title:"2025 年 CSP-J 第一轮",minutes:120,note:"单项选择完整收录，阅读程序与完善程序为同考点精编",choice:[{stem:"计算机病毒本质上是（ ）。",options:["一段具有破坏性的程序","一种硬件故障","一种生物病毒","电磁干扰信号"],answer:0,analysis:"计算机病毒是人为编写、能自我复制并破坏系统功能的程序代码。",tags:["计算机常识"],diff:1},{stem:"著名的摩尔定律描述的是（ ）。",options:["集成电路上可容纳的晶体管数量约每隔 18~24 个月翻一番","计算机的价格每年下降一半","网络带宽每五年翻一番","程序 bug 数量随代码量指数增长"],answer:0,analysis:"摩尔定律由英特尔创始人戈登·摩尔提出，描述集成度（晶体管数量）的指数增长趋势。",tags:["计算机常识"],diff:1},{stem:"二进制数 111111 转换为十进制数是（ ）。",options:["31","63","64","127"],answer:1,analysis:"6 个 1 即 2⁶ − 1 = 63。技巧：n 个 1 的二进制数 = 2ⁿ − 1。",tags:["数制转换"],diff:1},{stem:"下列字符编码标准中，由我国制定的是（ ）。",options:["GB2312","ASCII","UTF-8","Unicode"],answer:0,analysis:"GB2312 是我国 1980 年发布的汉字编码国家标准；ASCII 是美国标准；Unicode/UTF-8 是国际标准。",tags:["编码与存储","计算机常识"],diff:1},{stem:"C++ 中表达式 `7 / 2` 的值为（ ）。",options:["3","3.5","4","2"],answer:0,analysis:"两个整型相除是整数除法，直接舍去小数部分得 3；写成 7.0 / 2 才会得到 3.5。",tags:["语言基础"],diff:1},{stem:"浏览器的『后退』功能（回到最近访问的页面）最适合用（ ）实现。",options:["队列","栈","堆","顺序表"],answer:1,analysis:"访问记录依次入栈，后退即弹出栈顶——后进先出正好对应『最近的最先回退』。",tags:["栈"],diff:1},{stem:"打印机依次处理多个打印任务时，通常采用的策略是（ ）。",options:["先提交的任务先打印（队列）","后提交的任务先打印（栈）","随机选择任务","只打印最后一个任务"],answer:0,analysis:"打印任务按到达顺序处理，是队列 FIFO 的典型应用。",tags:["队列"],diff:1},{stem:"在树结构中，一个结点的子树个数称为该结点的（ ）。",options:["深度","高度","度","层数"],answer:2,analysis:"度 = 子树个数；深度是到根的距离，高度是到叶子的最长距离。概念辨析题注意区分。",tags:["树与二叉树"],diff:2},{stem:"计数排序最适用的场景是（ ）。",options:["待排数据的取值范围较小","数据规模极大且范围大","任意精度的实数排序","只能存链表结构"],answer:0,analysis:"计数排序用值域大小的桶计数，值域小（如 0~1000 的整数）时可达 O(n+m)；值域大则空间爆炸。",tags:["排序"],diff:2},{stem:"8 个人每两人都握手一次，共握手（ ）次。",options:["24","28","32","56"],answer:1,analysis:"C(8,2) = 28。注意与『单循环比赛场次』是同一个模型。",tags:["组合数学"],diff:1},{stem:"不借助临时变量交换两个整数变量 a、b 的值，可以使用的运算是（ ）。",options:["异或","取余","左移","按位取反"],answer:0,analysis:"a^=b; b^=a; a^=b; 利用异或自反性完成交换。",tags:["位运算"],diff:2},{stem:"平面上 5 条直线（任意两条不平行、任意三条不共点）最多能把平面分成（ ）个区域。",options:["15","16","17","18"],answer:1,analysis:"n 条直线最多分平面 (n²+n+2)/2 个区域，n=5 时为 (25+5+2)/2 = 16。",tags:["组合数学","递归与分治"],diff:3},{stem:'字符串 "abc" 的非空连续子串共有（ ）个。',options:["5","6","7","8"],answer:1,analysis:"长度为 n 的字符串有 n(n+1)/2 个非空连续子串：3×4/2 = 6（a, b, c, ab, bc, abc）。",tags:["字符串","组合数学"],diff:2},{stem:"哥尼斯堡七桥问题（一笔画问题）是由哪位数学家解决并由此开创图论的（ ）。",options:["欧拉","高斯","牛顿","莱布尼茨"],answer:0,analysis:"1736 年欧拉将七桥问题抽象为图的一笔画问题并给出判定条件，标志着图论诞生。",tags:["图论","计算机常识"],diff:2},{stem:"在含 n 个元素的无序数组中顺序查找一个存在的元素，平均需要比较约（ ）次。",options:["1","log₂n","n / 2","n"],answer:2,analysis:"目标等概率出现在每个位置，平均比较 (1+n)/2 ≈ n/2 次，复杂度仍为 O(n)。",tags:["复杂度","搜索"],diff:2}],reads:[{title:"阅读程序（1）",intro:"阅读下面的程序，回答问题。输入第一行为 n（1 ≤ n ≤ 1000），第二行为 n 个范围在 1~1000 的整数。",code:`#include <iostream>
using namespace std;

int cnt[1005];

int main() {
    int n;
    cin >> n;
    int mx = 0;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        cnt[x]++;
        if (x > mx) mx = x;
    }
    int total = 0;
    for (int v = 1; v <= mx; v++) {
        for (int t = 0; t < cnt[v]; t++) {
            cout << v << (total + 1 < n ? ' ' : '\\n');
            total++;
        }
    }
    return 0;
}`,questions:[{type:"judge",stem:"该程序实现的是计数排序，输出为非递减序列。",answer:0,score:2,analysis:"先统计每个值出现次数，再按值从小到大依次输出，即计数排序。",tags:["程序阅读","排序"],diff:1},{type:"judge",stem:"无论输入如何（值都在 1~1000），内层输出循环的总执行次数恰好为 n。",answer:0,score:2,analysis:"每个输入元素使某个 cnt[x] 加 1，输出阶段把每个计数恰好展开一次，总共 n 次。",tags:["程序阅读","排序"],diff:2},{type:"choice",stem:"输入为 `5` 和 `3 1 2 3 1` 时，程序的输出是（ ）。",options:["1 1 2 3 3","1 2 3 3 1","3 1 2 3 1","1 1 3 2 3"],answer:0,score:3,analysis:"cnt[1]=2、cnt[2]=1、cnt[3]=2，按值展开输出 1 1 2 3 3。",tags:["程序阅读","排序"],diff:1},{type:"choice",stem:"计数排序对输入数据取值范围的要求是（ ）。",options:["取值范围不能太大","必须都是偶数","必须互不相同","必须已经有序"],answer:0,score:3,analysis:"桶数组的大小取决于值域上限，范围过大会浪费大量空间甚至无法开数组。",tags:["程序阅读","排序"],diff:2},{type:"choice",stem:"设输入值的上限为 m，则该算法的时间复杂度为（ ）。",options:["O(n²)","O(n log n)","O(n + m)","O(nm)"],answer:2,score:3,analysis:"统计 O(n) + 按值域展开 O(n+m)，总体 O(n+m)，不是基于比较的排序。",tags:["程序阅读","复杂度","排序"],diff:3}]}],completes:[{title:"完善程序（1）",intro:"（BFS 迷宫最短路）n×m 的迷宫中 0 表示可通行、1 表示障碍，每一步可以向上/下/左/右走一格。下面的程序用 BFS 求从左上角 (1,1) 到右下角 (n,m) 的最短步数（经过的格子数，含起终点）并输出。请补全代码。",code:`#include <iostream>
#include <queue>
using namespace std;

int mp[105][105];
int dist[105][105];   // 0 表示未访问
int dx[4] = {-1, 1, 0, 0};
int dy[4] = {0, 0, -1, 1};

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) cin >> mp[i][j];
    queue<pair<int, int>> q;
    q.push({1, 1});
    dist[1][1] = ① ;
    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();
        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx < 1 || nx > n || ny < 1 || ny > m) continue;
            if ( ② ) continue;
            if ( ③ ) continue;
            dist[nx][ny] = ④ ;
            q.push({nx, ny});
        }
    }
    cout << ⑤ << endl;
    return 0;
}`,blanks:[{stem:"第 ① 空应填入（ ）。",options:["1","0","-1","n + m"],answer:0,analysis:"题目要求步数含起点，故起点距离记为 1；同时非 0 也起到『已访问』标记的作用。",tags:["算法设计","搜索"],diff:2},{stem:"第 ② 空应填入（ ）。",options:["mp[nx][ny] == 1","mp[nx][ny] == 0","dist[nx][ny] == 0","mp[x][y] == 1"],answer:0,analysis:"障碍物格子（值为 1）不可通行，直接跳过。",tags:["算法设计","搜索"],diff:1},{stem:"第 ③ 空应填入（ ）。",options:["dist[nx][ny] != 0","dist[nx][ny] == 0","dist[nx][ny] < 0","dist[x][y] != 0"],answer:0,analysis:"dist 非 0 说明该格已被访问过（BFS 首次到达即最短），不能重复入队。",tags:["算法设计","搜索"],diff:3},{stem:"第 ④ 空应填入（ ）。",options:["dist[x][y] + 1","dist[x][y]","dist[nx][ny] + 1","dist[x][y] - 1"],answer:0,analysis:"新格子的距离 = 当前格子距离 + 1，这正是 BFS 按层扩展的递推关系。",tags:["算法设计","搜索"],diff:2},{stem:"第 ⑤ 空应填入（ ）。",options:["dist[n][m]","dist[1][1]","dist[n][m] + 1","dist[m][n]"],answer:0,analysis:"终点为 (n, m)，其 dist 值即最短步数；若为 0 则表示不可达。",tags:["算法设计","搜索"],diff:1}]}]};export{n as default};
