-- MySQL dump 10.13  Distrib 9.0.1, for macos13.6 (x86_64)
--
-- Host: localhost    Database: geffen_db
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Book_SubTopics`
--

DROP TABLE IF EXISTS `Book_SubTopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Book_SubTopics` (
  `ISBN` varchar(13) NOT NULL,
  `SubtopicID` int NOT NULL,
  PRIMARY KEY (`ISBN`,`SubtopicID`),
  KEY `SubtopicID` (`SubtopicID`),
  CONSTRAINT `book_subtopics_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`),
  CONSTRAINT `book_subtopics_ibfk_2` FOREIGN KEY (`SubtopicID`) REFERENCES `Subtopics` (`SubtopicID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Book_SubTopics`
--

LOCK TABLES `Book_SubTopics` WRITE;
/*!40000 ALTER TABLE `Book_SubTopics` DISABLE KEYS */;
INSERT INTO `Book_SubTopics` VALUES ('9798855080247',4),('9780142410585',16),('9780142410585',18),('9780316435161',40),('9780316435161',48),('9780593430002',53),('9780063228658',61),('9780063228658',64),('9781368053433',65),('9780063228658',66),('9780063228658',74),('9781368053433',74),('9781433819186',105),('9780063228658',109),('9780593430002',109),('9781534111134',109),('9781416985952',130),('9781534146259',132),('9781416985952',139),('9780063228658',149),('9781623542658',152),('9781534111127',158),('9781416985952',160),('9781405919258',161),('9781416985952',166),('9781405919258',167),('9781433819186',171),('9780063228658',178),('9781534146250',201),('9781534111127',232),('9781623542658',252),('9781623542658',261),('9798855080247',262),('9780063228658',263),('9798855080247',280),('9781405919258',309),('9780063228658',312),('9781623542658',313),('9781663621665',313),('9781623542658',316),('9781663621665',316),('9780063228658',345),('9780063228658',349),('9780063228658',382),('9781534111134',382),('9780063228658',386),('9781534111134',386),('9780142410585',400),('9781433819186',400),('9781534146250',400),('9781534146259',400),('9781433819186',401),('9781534146250',404),('9781534146250',405),('9781534146259',405),('9780142410585',406),('9781433819186',406),('9781534146259',430),('9780316435161',434),('9781534111127',436),('9780063228658',438),('9780063228658',456),('9781534146250',461),('9780316435161',462),('9781433819186',471),('9780062097170',491),('9780590960755',491),('9780807119464',491),('9781250245625',491),('9781596435124',491);
/*!40000 ALTER TABLE `Book_SubTopics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Books` (
  `ISBN` varchar(13) NOT NULL,
  `Title` varchar(500) DEFAULT NULL,
  `Author` varchar(255) DEFAULT NULL,
  `BookDesc` longtext,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
INSERT INTO `Books` VALUES ('9780062097170','A picture for Harold\'s room','Crockett Johnson',NULL),('9780063228658','A Hundred thousand welcomes','Mary Lee Donovan',NULL),('9780142410585','amazing you','gail saltz',NULL),('9780316435161','A Computer Called Katherine','Suzanne Slade',NULL),('9780590960755','amelia and eleanor go for a ride','pam munoz-ryan',NULL),('9780593430002','All are neighbors','Alexandra Penfold',NULL),('9780807119464','a band of angels','deboran hopkinson',NULL),('9781250245625','A is for awesome: 23 iconic women who changed the world','Eva Chen',NULL),('9781368053433','7 ate 9: the untold story','Tara Lazar',NULL),('9781405919258','Always with you,always with me','Kelly Rowland and Jessica McKay',NULL),('9781416985952','Alexander and the Terrible,Horrible,No Good,Very Bad Day','Judith Viorst',NULL),('9781433819186','All my stripes','Shaina Rudolph and Danielle Royer',NULL),('9781534111127','a friend like you','julia hubery',NULL),('9781534111134','A teacher like you','Frank Murphy & Barbara Dan',NULL),('9781534146250','A girl like you','Frank Murphy & Carla Murphy',NULL),('9781534146259','A boy like you','Frank Murphy',NULL),('9781596435124','a place where sunflowers grow','amy lee-tai',NULL),('9781623542658','Abuelita and I make flan','Adrianna Hernandez Bergstrum',NULL),('9781663621665','Abuelita\'s Heart','Amy Córdova',NULL),('9798855080247','A spoonful of frogs','Casey Lyall',NULL);
/*!40000 ALTER TABLE `Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subtopics`
--

DROP TABLE IF EXISTS `Subtopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subtopics` (
  `SubtopicID` int NOT NULL AUTO_INCREMENT,
  `SubtopicName` varchar(100) DEFAULT NULL,
  `TopicID` int DEFAULT NULL,
  PRIMARY KEY (`SubtopicID`),
  UNIQUE KEY `SubtopicName` (`SubtopicName`),
  KEY `TopicID` (`TopicID`),
  CONSTRAINT `subtopics_ibfk_1` FOREIGN KEY (`TopicID`) REFERENCES `Topics` (`TopicID`)
) ENGINE=InnoDB AUTO_INCREMENT=492 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subtopics`
--

LOCK TABLES `Subtopics` WRITE;
/*!40000 ALTER TABLE `Subtopics` DISABLE KEYS */;
INSERT INTO `Subtopics` VALUES (1,'acceptance',1),(2,'actions and consequences',2),(3,'activism',3),(4,'adaptation',4),(5,'advocacy',5),(6,'aging',6),(7,'affection',7),(8,'animal sounds',8),(9,'anthropomorphizing',9),(10,'beauty standards',10),(11,'biological',11),(12,'body',12),(13,'bodily autonomy',12),(14,'consent',12),(15,'gestures',12),(16,'image',12),(17,'language',12),(18,'parts',12),(19,'borders',13),(20,'bravery',14),(21,'breaking norms',15),(22,'categories',16),(23,'celebration',17),(24,'birthday',17),(25,'diwali',17),(26,'first thanksgiving',17),(27,'party',17),(28,'holidays',17),(29,'challenges in a new place',18),(30,'change',19),(31,'changing perspective',20),(32,'cognition',21),(33,'attention',21),(34,'awareness',21),(35,'cause and effect',21),(36,'cognitive development',21),(37,'cognitive dissonance',21),(38,'cognitive flexibility',21),(39,'creative thinking/solutions',21),(40,'critical thinking',21),(41,'deeper processing',21),(42,'delayed gratification',21),(43,'embodied cognition',21),(44,'executive function',21),(45,'inattention',21),(46,'learning',21),(47,'making decisions',21),(48,'problem-solving',21),(49,'reasoning and decision making skills',21),(50,'stages of consciousness',21),(51,'theory of mind',21),(52,'comfort',22),(53,'community',23),(54,'community support',24),(55,'comparison',25),(56,'competition',26),(57,'conflict',27),(58,'cooking',28),(59,'creativity',29),(60,'culture',30),(61,'activities',30),(62,'beliefs',30),(63,'competence',30),(64,'customs',30),(65,'differences',30),(66,'foods',30),(67,'heritage',30),(68,'history',30),(69,'identity',30),(70,'indigenous nations’',30),(71,'memory',30),(72,'pride',30),(73,'sense of culture',30),(74,'similarities',30),(75,'traditions',30),(76,'values',30),(77,'daily tasks/activities',31),(78,'discontinuous development',32),(79,'being different',34),(80,'comparisons',34),(81,'embracing differences',34),(82,'environments',34),(83,'individual differences',34),(84,'isn’t bad or wrong',34),(85,'perspectives',34),(86,'sociocultural differences',34),(87,'difficult topics',35),(88,'challenging stereotypes',35),(89,'colonization',35),(90,'discrimination',35),(91,'divorce',35),(92,'genocide',35),(93,'patriarchy',35),(94,'prejudices',35),(95,'racial discrimination',35),(96,'racism',35),(97,'sexual discrimination',35),(98,'slavery',35),(99,'stereotypes',35),(100,'talking about difficult topics',35),(101,'xenophobia',35),(102,'(dis)ability',36),(103,'adhd',36),(104,'americans with disabilities act',36),(105,'autism',36),(106,'blindness',36),(107,'cerebral palsy',36),(108,'deafness',36),(109,'diversity',36),(110,'down syndrome',36),(111,'dyslexia',36),(112,'hearing aids',36),(113,'language impairments',36),(114,'limb differences',36),(115,'nonverbal child and family',36),(116,'prosthetics',36),(117,'wheelchairs',36),(118,'diverse main character',38),(119,'dream big/following dreams',39),(120,'dreams',40),(121,'education',41),(122,'elaboration',42),(123,'emotions',43),(124,'anger',43),(125,'anxiety',43),(126,'boredom',43),(127,'curiosity',43),(128,'embarrassment',43),(129,'emotional expression',43),(130,'emotional regulation',43),(131,'empathy',43),(132,'fear',43),(133,'frustration',43),(134,'gratitude',43),(135,'guilt',43),(136,'homesickness',43),(137,'identifying emotions',43),(138,'loneliness',43),(139,'managing emotions',43),(140,'optimism',43),(141,'recognition of',43),(142,'regulation of',43),(143,'sadness',43),(144,'separation anxiety',43),(145,'shame',43),(146,'worrying what others think',43),(147,'empowerment',44),(148,'equality',45),(149,'ethnic diversity',46),(150,'everyone has their own skills',47),(151,'fairy tales',48),(152,'family',49),(153,'adoption',49),(154,'authoritarian parenting',49),(155,'blended',49),(156,'caring for each other',49),(157,'chosen family',49),(158,'connection',49),(159,'different types of families',49),(160,'dynamics',49),(161,'extended family',49),(162,'found',49),(163,'functions',49),(164,'generations',49),(165,'honoring elders',49),(166,'interactions',49),(167,'love',49),(168,'military families',49),(169,'new baby',49),(170,'new siblings',49),(171,'parent-child relationships',49),(172,'parent-child relationships in various species',49),(173,'parenting styles',49),(174,'parents protecting children',49),(175,'relationships',49),(176,'sibling relationships',49),(177,'structures',49),(178,'time',49),(179,'female empowerment',50),(180,'feminism',51),(181,'first day of school',52),(182,'first nation',53),(183,'food',54),(184,'function of the skin',55),(185,'fundamental attribution error',56),(186,'gay marriage',57),(187,'gender',58),(188,'assignment',58),(189,'breaking the binary',58),(190,'constancy',58),(191,'dysphoria',58),(192,'expectations',58),(193,'expression',58),(194,'fluidity',58),(195,'inclusive pronouns',58),(196,'nonconformity',58),(197,'norms',58),(198,'pronoun diversity',58),(199,'pronouns',58),(200,'pronouns changing over time',58),(201,'roles',58),(202,'specific activities',58),(203,'spectrum',58),(204,'transgender',58),(205,'transition',58),(206,'transgender child',58),(207,'getting organized',60),(208,'good vs. evil',61),(209,'growing cycle',62),(210,'growing up',63),(211,'growth',64),(212,'have to use pictures to decipher meaning',65),(213,'heroism',66),(214,'holding a grudge',67),(215,'home',68),(216,'honoring traditions',69),(217,'humor',70),(218,'hope',71),(219,'ideas',72),(220,'identity crisis',74),(221,'identity expression',75),(222,'imagination',76),(223,'imitating instrument sounds',77),(224,'immigration',78),(225,'includes additional resources',79),(226,'indigenous people',80),(227,'individual strengths',81),(228,'inhibition',82),(229,'inner beauty',83),(230,'inner strength',84),(231,'inspiring children/students',85),(232,'interconnected habitat',86),(233,'interesting mix of words and pictures',87),(234,'internal motivation to learn',88),(235,'intersectionality',89),(236,'introduces new concept',90),(237,'it\'s okay to make mistakes',91),(238,'knock knock jokes',92),(239,'knowledge',93),(240,'labels',94),(241,'adjectives',95),(242,'almost every word has two \'oo\'s',95),(243,'alternative rhyme scheme',95),(244,'alliteration',95),(245,'alphabet',95),(246,'bilingual speaking',95),(247,'communication',95),(248,'definitions',95),(249,'descriptive',95),(250,'development',95),(251,'disappearing \'r\'',95),(252,'glossary',95),(253,'helpful for teaching spelling',95),(254,'learning the alphabet',95),(255,'literal vs. figurative language',95),(256,'meaning',95),(257,'metaphors',95),(258,'minimal but repetitive text',95),(259,'minimal pairs',95),(260,'phonemes',95),(261,'pronunciation guide',95),(262,'repetition',95),(263,'rhyming',95),(264,'rhythmic phrases',95),(265,'semantic development',95),(266,'sign language alphabet',95),(267,'silly sounds',95),(268,'similes',95),(269,'sophisticated vocabulary',95),(270,'sound effects',95),(271,'sounds and spelling',95),(272,'spoonerism',95),(273,'upper vs. lowercase letters',95),(274,'use of colors and font size to emphasize words',95),(275,'useful for speech pathologist',95),(276,'word learning',95),(277,'word play',95),(278,'word search',95),(279,'word segmentation',95),(280,'verbs',95),(281,'visual/contextual word learning',95),(282,'word object associations',95),(283,'leaving comfort zone',96),(284,'legacy',97),(285,'library',98),(286,'life skills',99),(287,'listening',100),(288,'literal and concrete thinking style',101),(289,'major life events',102),(290,'majority of characters are white',103),(291,'makes more sense to someone who knows skateboarding',104),(292,'manners',105),(293,'masculinity',106),(294,'maslow’s hierarchy of needs (drives,needs,self-actualization)',107),(295,'matching',108),(296,'math',109),(297,'basic math',109),(298,'counting',109),(299,'doubling',109),(300,'economics',109),(301,'large number comprehension',109),(302,'numbers',109),(303,'number concepts',109),(304,'episodic memory',111),(305,'memory loss',111),(306,'military',112),(307,'moral development',113),(308,'moral-reasoning',114),(309,'women in nontraditional jobs',115),(310,'moving',116),(311,'multiculturalism',117),(312,'multilingual text',118),(313,'code-switching',118),(314,'mandarin chinese,taiwanese hokkien,and english',118),(315,'mandarin chinese tones with comparable english examples',118),(316,'spanish and english',118),(317,'yiddish',118),(318,'multiple aspects of identity',119),(319,'multiple meanings',120),(320,'multiple ways to be a warrior',121),(321,'music',122),(322,'names have meaning',123),(323,'naming',124),(324,'not finishing what you start',125),(325,'object permanence',126),(326,'oral storytelling',127),(327,'outer beauty',128),(328,'parental guide',129),(329,'parody',130),(330,'patience',131),(331,'paying it forward',132),(332,' people are multifaceted',133),(333,'perception',134),(334,'bold colors',134),(335,'changing light',134),(336,'color',134),(337,'common region',134),(338,'continuity',134),(339,'engaging multiple senses',134),(340,'figure-ground segregation',134),(341,'foreground/background',134),(342,'gestalt principles',134),(343,'grouping',134),(344,'hearing',134),(345,'light',134),(346,'motion',134),(347,'motion perception',134),(348,'ponzo illusion',134),(349,'proximity',134),(350,'relative size',134),(351,'scene perception',134),(352,'shadow',134),(353,'similarity',134),(354,'spotlight effect',134),(355,'tactile sensations',134),(356,'texture',134),(357,'texture gradient',134),(358,'vision',134),(359,'visual attention',134),(360,'use of color',134),(361,'perfectionism',135),(362,'persistence',136),(363,'personal history',137),(364,'personal space',138),(365,'personal style',139),(366,'perspective',140),(367,'perspective-taking',141),(368,'picky eaters',142),(369,'pictures without words',143),(370,'playing to your strengths',144),(371,'positive psychology',145),(372,'positive reinforcement',146),(373,'power of knowledge/books',147),(374,'practice',148),(375,'pride in name',149),(376,'process of solving a mystery',150),(377,'promotes diversity',151),(378,'psychological condition',152),(379,'puberty',153),(380,'punctuation',154),(381,'race',155),(382,'racial diversity',156),(383,'racial style',157),(384,'relations of elements to each other',158),(385,'relationship changes with time',159),(386,'religious diversity',160),(387,'religious references',161),(388,'resilience',162),(389,'resolution',163),(390,'responsibility',164),(391,'revised nursery rhymes',165),(392,'rhythm',166),(393,'rituals',167),(394,'routine fixedness/adaptability',168),(395,'routines',169),(396,'science behind light',170),(397,'search strategies',171),(398,'seasonal activities',172),(399,'seasons',173),(400,'self-acceptance',174),(401,'self-concept',175),(402,'self-confidence',176),(403,'self-esteem',177),(404,'self-expression',178),(405,'self-identity',179),(406,'self-love',180),(407,'self-perception',181),(408,'self',182),(409,'being yourself',182),(410,'believing in yourself',182),(411,'developing a positive self-concept',182),(412,'younger kids\' sense of self is based on physical characteristics',182),(413,'selfishness',183),(414,'sensory processing challenges',184),(415,'sex roles',185),(416,'sex-typing',186),(417,'sexual attraction spectrum',187),(418,'shapes',188),(419,'shows the same rooms',189),(420,'skateboarding',191),(421,'skills',192),(422,'skin pigmentation',193),(423,'skin tone',194),(424,'sleep',195),(425,'social',196),(426,'attachment/secure attachment',196),(427,'belonging',196),(428,'bullying',196),(429,'communication difficulties',196),(430,'cooperation',196),(431,'developing positive relationships with others',196),(432,'exclusion',196),(433,'feeling left out',196),(434,'finding your place',196),(435,'finding your voice',196),(436,'friendship',196),(437,'helping others',196),(438,'inclusivity',196),(439,'insecure attachment',196),(440,'isolation',196),(441,'kindness',196),(442,'learning to say no',196),(443,'love languages',196),(444,'making friends',196),(445,'multiple types of communication',196),(446,'new relationships',196),(447,'not wanting to hurt other people\'s feelings',196),(448,'peer relationships',196),(449,'popularity',196),(450,'realizing others have fear',196),(451,'social identity theory',196),(452,'social justice',196),(453,'social routines',196),(454,'social skills',196),(455,'social support',196),(456,'sharing',196),(457,'sharing knowledge',196),(458,'showing love without using words',196),(459,'shy child',196),(460,'socialization',196),(461,'speaking up for yourself and others',196),(462,'standing up for yourself and others',196),(463,'staying connected',196),(464,'taking care of people',196),(465,'taking turns',196),(466,'unconditional love',196),(467,'understanding your place',196),(468,'very one-sided relationship',196),(469,'what brings friends together and separates them',196),(470,'withdrawn rejected child category',196),(471,'socio communicative challenges',197),(472,'sociocultural expectations',198),(473,'sociocultural perspective',199),(474,'sometimes imperfect is just right',200),(475,'starting at a new school',201),(476,'starting school',202),(477,'storytelling',203),(478,'support',204),(479,'synesthesia',205),(480,'taking care of shared space',206),(481,'teachers’ impact on students\' lives',207),(482,'teaches children to find ways to shine during difficult times',208),(483,'teaching children animal sounds',209),(484,'telenovela cultural aspect',210),(485,'tolerance',212),(486,'transitions',214),(487,'tutorial on manners',215),(488,'two houses but same activities',216),(489,'uniqueness',217),(490,'you know best',219),(491,'empty tag',220);
/*!40000 ALTER TABLE `Subtopics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Topics`
--

DROP TABLE IF EXISTS `Topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Topics` (
  `TopicID` int NOT NULL AUTO_INCREMENT,
  `TopicName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`TopicID`),
  UNIQUE KEY `TopicName` (`TopicName`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Topics`
--

LOCK TABLES `Topics` WRITE;
/*!40000 ALTER TABLE `Topics` DISABLE KEYS */;
INSERT INTO `Topics` VALUES (36,'(dis)ability'),(1,'acceptance'),(2,'actions and consequences'),(3,'activism'),(4,'adaptation'),(5,'advocacy'),(7,'affection'),(6,'aging'),(8,'animal sounds'),(9,'anthropomorphizing'),(10,'beauty standards'),(11,'biological sex'),(12,'body'),(13,'borders'),(14,'bravery'),(15,'breaking norms'),(16,'categories'),(17,'celebration'),(18,'challenges in a new place'),(19,'change'),(20,'changing perspective'),(21,'cognition'),(22,'comfort'),(23,'community'),(24,'community support'),(25,'comparison'),(26,'competition'),(27,'conflict'),(28,'cooking'),(29,'creativity'),(30,'culture'),(31,'daily tasks/activities'),(33,'differences'),(34,'different'),(35,'difficult topics'),(32,'discontinuous development'),(38,'diverse main character'),(37,'diversity'),(39,'dream big/following dreams'),(40,'dreams'),(41,'education'),(42,'elaboration'),(43,'emotions'),(44,'empowerment'),(220,'empty tag'),(45,'equality'),(46,'ethnic diversity'),(47,'everyone has their own skills'),(48,'fairy tales'),(49,'family'),(50,'female empowerment'),(51,'feminism'),(52,'first day of school'),(53,'first nation'),(54,'food'),(55,'function of the skin'),(56,'fundamental attribution error'),(57,'gay marriage'),(58,'gender'),(59,'gestures'),(60,'getting organized'),(61,'good vs. evil'),(62,'growing cycle'),(63,'growing up'),(64,'growth'),(65,'have to use pictures to decipher meaning'),(66,'heroism'),(67,'holding a grudge'),(68,'home'),(69,'honoring traditions'),(71,'hope'),(70,'humor'),(72,'ideas'),(73,'identity'),(74,'identity crisis'),(75,'identity expression'),(76,'imagination'),(77,'imitating instrument sounds'),(78,'immigration'),(79,'includes additional resources'),(80,'indigenous people'),(81,'individual strengths'),(82,'inhibition'),(83,'inner beauty'),(84,'inner strength'),(85,'inspiring children/students'),(86,'interconnected habitat'),(87,'interesting mix of words and pictures'),(88,'internal motivation to learn'),(89,'intersectionality'),(90,'introduces new concept'),(91,'it\'s okay to make mistakes'),(92,'knock knock jokes'),(93,'knowledge'),(94,'labels'),(95,'language'),(96,'leaving comfort zone'),(97,'legacy'),(98,'library'),(99,'life skills'),(100,'listening'),(101,'literal and concrete thinking style'),(102,'major life events'),(103,'majority of characters are white'),(104,'makes more sense to someone who knows skateboarding'),(105,'manners'),(106,'masculinity'),(107,'maslow’s hierarchy of needs (drives,needs,self-actualization)'),(108,'matching'),(109,'math'),(110,'meaning'),(111,'memory'),(112,'military'),(113,'moral development'),(114,'moral-reasoning'),(116,'moving'),(117,'multiculturalism'),(118,'multilingual text'),(119,'multiple aspects of identity'),(120,'multiple meanings'),(121,'multiple ways to be a warrior'),(122,'music'),(123,'names have meaning'),(124,'naming'),(125,'not finishing what you start'),(126,'object permanence'),(127,'oral storytelling'),(128,'outer beauty'),(129,'parental guide'),(130,'parody'),(131,'patience'),(132,'paying it forward'),(133,'people are multifaceted'),(134,'perception'),(135,'perfectionism'),(136,'persistence'),(137,'personal history'),(138,'personal space'),(139,'personal style'),(140,'perspective'),(141,'perspective-taking'),(142,'picky eaters'),(143,'pictures without words'),(144,'playing to your strengths'),(145,'positive psychology'),(146,'positive reinforcement'),(147,'power of knowledge/books'),(148,'practice'),(149,'pride in name'),(150,'process of solving a mystery'),(151,'promotes diversity'),(152,'psychological condition'),(153,'puberty'),(154,'punctuation marks'),(155,'race'),(156,'racial diversity'),(157,'racial style'),(158,'relations of elements to each other'),(159,'relationship changes with time'),(160,'religious diversity'),(161,'religious references'),(162,'resilience'),(163,'resolution'),(164,'responsibility'),(165,'revised nursery rhymes'),(166,'rhythm'),(167,'rituals'),(168,'routine fixedness/adaptability'),(169,'routines'),(170,'science behind light'),(171,'search strategies'),(172,'seasonal activities'),(173,'seasons'),(182,'self'),(174,'self-acceptance'),(175,'self-concept'),(176,'self-confidence'),(177,'self-esteem'),(178,'self-expression'),(179,'self-identity'),(180,'self-love'),(181,'self-perception'),(183,'selfishness'),(184,'sensory processing challenges'),(185,'sex roles'),(186,'sex-typing'),(187,'sexual attraction spectrum'),(188,'shapes'),(189,'shows the same rooms'),(190,'similarity'),(191,'skateboarding'),(192,'skills'),(193,'skin pigmentation'),(194,'skin tone'),(195,'sleep'),(196,'social'),(197,'socio communicative challenges'),(198,'sociocultural expectations'),(199,'sociocultural perspective'),(200,'sometimes imperfect is just right'),(201,'starting at a new school'),(202,'starting school'),(203,'storytelling'),(204,'support'),(205,'synesthesia'),(206,'taking care of shared space'),(207,'teachers’ impact on students\' lives'),(208,'teaches children to find ways to shine during difficult times'),(209,'teaching children animal sounds'),(210,'telenovela cultural aspect'),(211,'time'),(212,'tolerance'),(213,'traditions'),(214,'transitions'),(215,'tutorial on manners'),(216,'two houses but same activities'),(217,'uniqueness'),(218,'values'),(115,'women in nontraditional jobs'),(219,'you know best');
/*!40000 ALTER TABLE `Topics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-05 23:31:10
