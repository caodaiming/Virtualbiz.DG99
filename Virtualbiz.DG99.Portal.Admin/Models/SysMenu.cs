using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Virtualbiz.DG99.Portal.Admin.Models
{
    public class SysMenu
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public string Icon { get; set; }

        public int FatherID { get; set; }

        public List<SysMenu> Children { get; set; }



        public static List<SysMenu> GetSysMenu()
        {
            List<SysMenu> sysMenus = new List<SysMenu>();
            sysMenus.Add(new SysMenu { ID = 1, Name = "账户管理", FatherID = 0, Icon = "icon-cog", Url = "" });
            sysMenus.Add(new SysMenu { ID = 2, Name = "公司管理", FatherID = 1, Icon = "icon-cog", Url = "Company/Index" });
            sysMenus.Add(new SysMenu { ID = 3, Name = "账户管理", FatherID = 1, Icon = "icon-cog", Url = "" });

            List<SysMenu> list = new List<SysMenu>();

            foreach (var item in sysMenus.Where(p => p.FatherID == 0))
            {
                list.Add(new SysMenu
                {
                    FatherID = item.FatherID,
                    Icon = item.Icon,
                    ID = item.ID,
                    Name = item.Name,
                    Url = item.Url,
                    Children = (from p in sysMenus
                                where p.FatherID == item.ID
                                select new SysMenu
                                {
                                    FatherID = p.FatherID,
                                    Icon = p.Icon,
                                    ID = p.ID,
                                    Name = p.Name,
                                    Url = p.Url,
                                }).ToList()
                });

            }

            return list;
        }
    }

  
}
