"""스튜디오 '새 도면' 예시를 만든다.

네이버 클라우드 「서비스 아이콘 및 활용 예시」 PPTX 20~23쪽의 활용 예시 네 장을 옮겼다.
슬라이드 좌표를 그대로 키우면 영역만 커지고 아이콘은 그대로라 텅 빈 도면이 된다. 그래서
슬라이드의 구성(무엇이 어느 층·존·영역에 있고 어디로 이어지는지)만 따르고, 배치는 일정한
격자(가로 130px, 세로 150px)에 다시 놓는다. 영역은 안에 든 노드에 맞춰 크기를 정한다.

아이콘은 슬라이드 그림을 스튜디오 아이콘과 모양으로 대조해 골랐다. 카탈로그에 없는 것
(Users, IDS·IPS·WAF, Kafka, Spark, Cassandra, 결제 대행 등)은 같은 이름의 상자로 둔다.
영역에는 연결점이 없어서 선은 영역 안의 아이콘·상자끼리 잇는다. 한 곳에서 둘로 갈라지는
선은 왼쪽·오른쪽 점에서 나가게 해 단계 번호가 한데 몰리지 않게 한다.

    python3 docs/studio/build_examples.py
"""
import json, os, sys

sys.path.insert(0, os.path.dirname(__file__))
from build_docs import Doc, ROOT, text_width  # noqa: E402

OUT = os.path.join(ROOT, 'src', 'components', 'studio', 'examples')
COL, ROW = 130, 150
PAD_X, PAD_TOP, PAD_BOTTOM = 26, 40, 16


def icon(d, id, icon_id, label, c, r, sub=None):
    """격자 (c, r)에 아이콘 그림의 중심이 오게 둔다. 그림 중심은 노드 위에서 28px 아래다."""
    w = max(92, min(170, max(text_width(label, 12.5), text_width(sub or '', 10.5)) + 16))
    return d.icon(id, icon_id, label, round(c * COL - w / 2), round(r * ROW - 28), sub)


def box(d, id, kind, label, c, r, sub=None):
    w = max(132, max(text_width(label, 13.5), text_width(sub or kind, 10.5)) + 36)
    return d.box(id, kind, label, round(c * COL - w / 2), round(r * ROW - 31), sub)


def fit(d, id, variant, label, members):
    """안에 든 노드·영역을 감싸는 크기로 영역을 만든다. VPC 이름은 영역 바깥 위에 붙어 위 여백이 작다."""
    xs0 = min(d.bounds[m][0] for m in members)
    ys0 = min(d.bounds[m][1] for m in members)
    xs1 = max(d.bounds[m][0] + d.bounds[m][2] for m in members)
    ys1 = max(d.bounds[m][1] + d.bounds[m][3] for m in members)
    top = PAD_X if variant == 'vpc' else PAD_TOP
    return d.area(id, variant, label, xs0 - PAD_X, ys0 - top, xs1 - xs0 + PAD_X * 2, ys1 - ys0 + top + PAD_BOTTOM)


def still(**data):
    """흐름이 아닌 관계선(보안 검사, 관리 접속 등). 점선이고 패킷이 지나가지 않는다."""
    return {'dashed': True, 'animated': False, **data}


# ── 20쪽 ─────────────────────────────────────────────────────────
def autoscaling():
    d = Doc('ncp-autoscaling', 'Auto Scaling 가용성 확보')
    icon(d, 'secmon', 'securitymonitoring', 'Security Monitoring', 0, -0.3)
    icon(d, 'ddos', 'basic-security', 'Anti-DDoS', 1.2, -0.3)
    box(d, 'ids', 'service', 'IDS · IPS · WAF', 2.4, -0.3)
    fit(d, 'sec', 'plain', 'Security Monitoring', ['secmon', 'ddos', 'ids'])
    box(d, 'users', 'client', 'Users', 5, -0.3)

    icon(d, 'lb1', 'load-balancer', 'Load Balancer', 5, 1)
    icon(d, 'asWeb', 'auto-scaling', 'Auto Scaling', 2, 2)
    for key, c in [('web1', 3), ('web2', 4), ('web3', 6), ('web4', 7)]:
        icon(d, key, 'server', 'Web', c, 2)
    fit(d, 'web', 'plain', 'Web Servers', ['asWeb', 'web1', 'web2', 'web3', 'web4'])
    icon(d, 'lb2', 'load-balancer', 'Load Balancer', 5, 3)
    icon(d, 'app1', 'server', 'APP', 4, 4)
    icon(d, 'app2', 'server', 'APP', 6, 4)
    icon(d, 'asApp', 'auto-scaling', 'Auto Scaling', 7, 4)
    fit(d, 'app', 'plain', 'APP Servers', ['app1', 'app2', 'asApp'])
    icon(d, 'lb3', 'load-balancer', 'Load Balancer', 5, 5)

    icon(d, 'redis', 'cloud-dbfor-redis', 'Cloud DB for Redis', 2.2, 6.2)
    fit(d, 'cache', 'plain', 'Cache', ['redis'])
    icon(d, 'master', 'cloud-db', 'Master (write)', 4, 6.2)
    icon(d, 'slave1', 'cloud-db', 'Slave (read)', 5, 6.2)
    icon(d, 'slave2', 'cloud-db', 'Slave (read)', 6, 6.2)
    fit(d, 'db', 'plain', 'Cloud DB', ['master', 'slave1', 'slave2'])
    icon(d, 'nas', 'nas', 'NAS', 7.4, 6.2)
    icon(d, 'block', 'block-storage', 'Block Storage', 8.4, 6.2)
    fit(d, 'storage', 'plain', 'Storage', ['nas', 'block'])
    fit(d, 'vpc', 'vpc', 'VPC', ['lb1', 'web', 'lb2', 'app', 'lb3', 'cache', 'db', 'storage'])

    icon(d, 'cdn', 'cdn', 'CDN', 10.2, 1)
    icon(d, 'objst', 'object-storage', 'Object Storage', 10.2, 2)
    fit(d, 'static', 'plain', 'Static Resources', ['cdn', 'objst'])
    icon(d, 'basic', 'basic-security', 'Basic Security', 10.2, 4.6)
    icon(d, 'mon', 'monitoring', 'Monitoring', 10.2, 5.6)

    d.edge('users', 'lb1', 'b', 't', step=1)
    d.edge('users', 'cdn', 'r', 't', step=1)
    d.edge('ids', 'users', 'r', 'l', **still())
    d.edge('lb1', 'web2', 'l', 't', step=2)
    d.edge('lb1', 'web3', 'r', 't', step=2)
    d.edge('web2', 'lb2', 'b', 'l', step=3)
    d.edge('web3', 'lb2', 'b', 'r', step=3)
    d.edge('web4', 'objst', 'r', 'l', **still())
    d.edge('lb2', 'app1', 'b', 't', step=4)
    d.edge('lb2', 'app2', 'b', 't', step=4)
    d.edge('app1', 'redis', 'l', 't', step=5)
    d.edge('app1', 'master', 'b', 't', step=5)
    d.edge('app2', 'lb3', 'b', 'r', step=5)
    d.edge('lb3', 'slave1', 'b', 't', step=6)
    d.edge('lb3', 'slave2', 'r', 't', step=6)
    d.edge('app2', 'nas', 'b', 't', step=5)
    return d


# ── 21쪽 ─────────────────────────────────────────────────────────
def ecommerce():
    d = Doc('ncp-ecommerce', 'E-Commerce (소규모)')
    icon(d, 'secmon', 'securitymonitoring', 'Security Monitoring', 0.4, -0.4)
    icon(d, 'ddos', 'basic-security', 'Anti-DDoS', 1.6, -0.4)
    box(d, 'ids', 'service', 'IDS · IPS · WAF', 2.8, -0.4)
    fit(d, 'sec', 'plain', 'Security Monitoring', ['secmon', 'ddos', 'ids'])
    box(d, 'users', 'client', 'Users', 5, -0.4)

    icon(d, 'lb1', 'load-balancer', 'Load Balancer', 5, 1)
    icon(d, 'asWeb', 'auto-scaling', 'Auto Scaling', 1.6, 2)
    icon(d, 'asWas', 'auto-scaling', 'Auto Scaling', 1.6, 4)
    for key, c in [('A1', 2.6), ('A2', 3.6), ('B1', 6.4), ('B2', 7.4)]:
        icon(d, f'web{key}', 'server', 'Web', c, 2)
        icon(d, f'was{key}', 'server', 'WAS', c, 4)
    icon(d, 'lb2', 'load-balancer', 'Load Balancer', 5, 3)
    fit(d, 'zoneA', 'zone', 'Zone A', ['asWeb', 'asWas', 'webA1', 'webA2', 'wasA1', 'wasA2'])
    fit(d, 'zoneB', 'zone', 'Zone B', ['webB1', 'webB2', 'wasB1', 'wasB2'])

    icon(d, 'redis', 'cloud-dbfor-redis', 'Cloud DB for Redis', 2.4, 5.8)
    fit(d, 'cache', 'plain', 'Cache', ['redis'])
    icon(d, 'master', 'cloud-db', 'Master', 4, 5.8)
    icon(d, 'slave1', 'cloud-db', 'Slave', 5, 5.8)
    icon(d, 'slave2', 'cloud-db', 'Slave', 6, 5.8)
    fit(d, 'db', 'plain', 'Cloud DB', ['master', 'slave1', 'slave2'])
    fit(d, 'dbs', 'plain', 'DB Servers', ['cache', 'db'])

    icon(d, 'cdn', 'cdn', 'CDN', 9.4, 2)
    icon(d, 'imgopt', 'image-optimizer', 'Image Optimizer', 9.4, 3)
    icon(d, 'objst', 'object-storage', 'Object Storage', 9.4, 4)
    fit(d, 'contents', 'plain', 'Contents', ['cdn', 'imgopt', 'objst'])
    icon(d, 'nat', 'nat-gateway', 'NAT Gateway', 9.4, 5.8)
    fit(d, 'natArea', 'plain', 'NAT', ['nat'])
    fit(d, 'vpc', 'vpc', 'VPC', ['lb1', 'lb2', 'zoneA', 'zoneB', 'dbs', 'contents', 'natArea'])

    box(d, 'https', 'external', 'HTTPS', 11.4, 5.8)
    box(d, 'payment', 'external', 'Payment Gateway', 13.4, 5.2)
    box(d, 'analytics', 'external', 'Analytics Tools', 13.4, 6.4, sub='3rd party')
    fit(d, 'ext', 'vpc', 'External Applications', ['payment', 'analytics'])

    d.edge('users', 'lb1', 'b', 't', step=1)
    d.edge('users', 'cdn', 'r', 't', step=1)
    d.edge('ids', 'users', 'r', 'l', **still())
    d.edge('lb1', 'webA2', 'l', 't', step=2)
    d.edge('lb1', 'webB1', 'r', 't', step=2)
    d.edge('webA2', 'lb2', 'b', 'l', step=3)
    d.edge('webB1', 'lb2', 'b', 'r', step=3)
    d.edge('lb2', 'wasA2', 'b', 't', step=4)
    d.edge('lb2', 'wasB1', 'b', 't', step=4)
    d.edge('wasA2', 'redis', 'b', 't', step=5)
    d.edge('wasB1', 'master', 'b', 't', step=5)
    d.edge('wasB2', 'nat', 'b', 'l', step=6)
    d.edge('nat', 'https', 'r', 'l', step=7)
    d.edge('https', 'payment', 'r', 'l', step=8)
    d.edge('https', 'analytics', 'r', 'l', step=8)
    return d


# ── 22쪽 ─────────────────────────────────────────────────────────
def hybrid():
    d = Doc('ncp-hybrid', 'Hybrid Cloud Hosting')
    box(d, 'adminL', 'client', 'Admin', 1, 0)
    icon(d, 'sslvpn', 'ssl-vpn', 'SSL VPN', 1, 1)
    box(d, 'users', 'client', 'Users', 2.8, 0)
    icon(d, 'internet', 'internet', 'Internet', 4.2, 0)
    icon(d, 'ddos', 'basic-security', 'Anti-DDoS', 5.8, 1)
    box(d, 'ids', 'service', 'IDS', 6.9, 1)
    fit(d, 'sec', 'plain', 'Security', ['ddos', 'ids'])

    icon(d, 'lb', 'load-balancer', 'Load Balancer', 3, 2.2)
    icon(d, 'web1', 'server', 'Web', 2, 3.2)
    icon(d, 'web2', 'server', 'Web', 4, 3.2)
    fit(d, 'web', 'plain', 'Web Servers', ['web1', 'web2'])
    icon(d, 'app1', 'server', 'APP', 2, 4.2)
    icon(d, 'app2', 'server', 'APP', 4, 4.2)
    fit(d, 'app', 'plain', 'APP Servers', ['app1', 'app2'])
    icon(d, 'objst', 'object-storage', 'Object Storage', 2, 5.2)
    icon(d, 'block', 'block-storage', 'Block Storage', 3, 5.2)
    icon(d, 'nas', 'nas', 'NAS', 4, 5.2)
    fit(d, 'storage', 'plain', 'Storage', ['objst', 'block', 'nas'])
    fit(d, 'ncp', 'vpc', 'NAVER Cloud Platform', ['lb', 'web', 'app', 'storage'])

    box(d, 'adminR', 'client', 'Admin', 9, 0)
    box(d, 'tunnel', 'external', 'Secure tunnel', 9, 1)
    icon(d, 'ipsec', 'managed-ipsec-vpn', 'IPSec VPN', 9, 2.2)
    icon(d, 'srv1', 'server', 'Server', 8, 3.2)
    icon(d, 'srv2', 'server', 'Server', 9, 3.2)
    fit(d, 'servers', 'plain', 'Servers', ['srv1', 'srv2'])
    box(d, 'firewall', 'service', 'Fire Wall', 8, 4.2)
    icon(d, 'db1', 'server', 'DB', 8, 5.2)
    icon(d, 'db2', 'server', 'DB', 9, 5.2)
    fit(d, 'dbs', 'plain', 'DB Servers', ['db1', 'db2'])
    fit(d, 'dc', 'vpc', 'NBP Data Center', ['ipsec', 'servers', 'firewall', 'dbs'])
    box(d, 'dedicated', 'external', 'Dedicated line', 9, 6.4)
    box(d, 'payment', 'external', 'Payment Gateway', 9, 7.4)
    fit(d, 'ext', 'vpc', 'External Applications', ['payment'])

    d.edge('users', 'internet', 'r', 'l', step=1)
    d.edge('internet', 'ddos', 'b', 'l', **still())
    d.edge('internet', 'lb', 'b', 't', step=2)
    d.edge('internet', 'srv1', 'r', 't', step=2)
    d.edge('lb', 'web1', 'l', 't', step=3)
    d.edge('lb', 'web2', 'r', 't', step=3)
    d.edge('web1', 'app1', 'b', 't', step=4)
    d.edge('web2', 'app2', 'b', 't', step=4)
    d.edge('app1', 'objst', 'b', 't', step=5)
    d.edge('app1', 'block', 'b', 't', step=5)
    d.edge('app2', 'nas', 'b', 't', step=5)
    d.edge('srv1', 'firewall', 'b', 't', step=3)
    d.edge('firewall', 'db1', 'b', 't', step=4)
    d.edge('db2', 'dedicated', 'b', 't', step=5)
    d.edge('dedicated', 'payment', 'b', 't', step=6)
    d.edge('web2', 'srv1', 'r', 'l', **still(label='Private Subnet'))
    d.edge('adminL', 'sslvpn', 'b', 't', **still())
    d.edge('sslvpn', 'web1', 'b', 'l', **still())
    d.edge('adminR', 'tunnel', 'b', 't', **still())
    d.edge('tunnel', 'ipsec', 'b', 't', **still())
    d.edge('ipsec', 'srv2', 'b', 't', **still())
    return d


# ── 23쪽 ─────────────────────────────────────────────────────────
def iot():
    d = Doc('ncp-iot', 'IoT Analysis Platform')
    box(d, 'devices', 'client', 'IoT Devices', 0, 2, sub='Drone · AI Speaker · Arduino')

    icon(d, 'cf', 'cloud-functions', 'Cloud Functions', 3, 0.6)
    fit(d, 'dt', 'plain', 'Data Transformation', ['cf'])
    icon(d, 'broker', 'server', 'MQTT broker', 2, 2)
    box(d, 'rule', 'service', 'Rule Engine', 4, 2)
    icon(d, 'devinfo', 'cloud-db', 'Device info', 2, 3)
    icon(d, 'policies', 'cloud-db', 'Policies', 4, 3)
    fit(d, 'gw', 'plain', 'Cloud Gateway (IoT Hub)', ['broker', 'rule', 'devinfo', 'policies'])

    box(d, 'nosql', 'database', 'Scalable NoSQL', 6, 0.6, sub='Cassandra')
    fit(d, 'warm', 'plain', 'Warm Data', ['nosql'])
    box(d, 'topic', 'queue', 'Topic Stream', 6, 2, sub='Kafka')
    box(d, 'spark', 'service', 'Spark Streaming', 7.3, 2)
    fit(d, 'sp', 'plain', 'Stream Processing', ['topic', 'spark'])
    icon(d, 'objst', 'object-storage', 'Object Storage', 7.3, 4.2)
    fit(d, 'cold', 'plain', 'Cold Data', ['objst'])

    icon(d, 'reporting', 'server', 'UI / Reporting Tools', 9.4, 0.6)
    fit(d, 'rep', 'plain', 'Reporting', ['reporting'])
    icon(d, 'biz', 'server', 'Biz Applications', 9.4, 2)
    box(d, 'alarms', 'external', 'Alarms', 9.4, 3, sub='SMS · Email · CRM')
    fit(d, 'apps', 'plain', 'Biz Applications', ['biz', 'alarms'])
    icon(d, 'tf', 'ncloud-tensorflowserver', 'TensorFlow Server', 9.4, 4.2)
    fit(d, 'ml', 'plain', 'Machine Learning', ['tf'])
    fit(d, 'ncp', 'vpc', 'NAVER Cloud Platform', ['dt', 'gw', 'warm', 'sp', 'cold', 'rep', 'apps', 'ml'])

    d.edge('devices', 'broker', 'r', 'l', step=1, label='MQTT')
    d.edge('broker', 'rule', 'r', 'l', step=2)
    d.edge('broker', 'devinfo', 'b', 't', **still())
    d.edge('rule', 'policies', 'b', 't', **still())
    d.edge('broker', 'cf', 't', 'l', step=3, label='Binary stream')
    d.edge('rule', 'topic', 'r', 'l', step=3)
    d.edge('cf', 'nosql', 'r', 'l', step=4, label='Json')
    d.edge('topic', 'spark', 'r', 'l', step=4)
    d.edge('spark', 'nosql', 't', 'r', step=5)
    d.edge('spark', 'biz', 'r', 'l', step=5)
    d.edge('topic', 'objst', 'b', 'l', step=5, label='Raw Data')
    d.edge('nosql', 'reporting', 'r', 'l', step=6)
    d.edge('biz', 'reporting', 't', 'b', step=6)
    d.edge('objst', 'tf', 'r', 'l', step=6)
    d.edge('tf', 'alarms', 't', 'b', step=7)
    return d


EXAMPLES = [autoscaling, ecommerce, hybrid, iot]


def main():
    os.makedirs(OUT, exist_ok=True)
    for build in EXAMPLES:
        d = build()
        # 큰 영역이 먼저 깔려야 안쪽 영역이 가려지지 않는다. 편집기에서 여는 예시라 글 속 뷰어용 투명 틀은 넣지 않는다.
        areas = sorted(d.areas, key=lambda a: -a['width'] * a['height'])
        doc = {'id': d.id, 'title': d.title, 'nodes': areas + d.nodes, 'edges': d.edges}
        with open(os.path.join(OUT, f'{d.id}.json'), 'w', encoding='utf-8') as fh:
            json.dump(doc, fh, ensure_ascii=False, indent=1)
            fh.write('\n')
        print(d.id, len(doc['nodes']), 'nodes', len(doc['edges']), 'edges')


if __name__ == '__main__':
    main()
